import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { Review } from "../models/review.model.js";

export async function createReview(req, res) {
    try {
        const { productId, orderId, rating } = req.body;

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ error: "Rating must be between 1 and 5" });
        }

        const user = req.user;

        // verify order exists and is delivered
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        if (order.clerkId !== user.clerkId) {
            return res.status(403).json({ error: "Not authorized to review this order" });
        }

        if (order.status !== "delivered") {
            return res.status(400).json({ error: "Can only review delivered orders" });
        }


        // verify product is in the order
        const productInOrder = order.orderItems.find(
            (item) => item.product.toString() === productId.toString()
        );
        if (!productInOrder) {
            return res.status(400).json({ error: "Product not found in this order" });
        }

        // atomic update or create OR Update Review
        const review = await Review.findOneAndUpdate(
            { productId, userId: user._id },
            { rating, orderId, productId, userId: user._id }, //Data To Save in db
            { new: true, upsert: true, runValidators: true }  //Return updated document. upsert=true if review exists → UPDATE if review does not exist → CREATE
        );

        // update the product rating with atomic aggregation
        //fetching all reviews to calcualte
        const reviews = await Review.find({ productId });
        //reduce calculate the average rating 
        const totalRating = reviews.reduce((sum, rev) => sum + rev.rating, 0);
        // Update Product Average Rating
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                averageRating: totalRating / reviews.length,
                totalReviews: reviews.length,
            },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            await Review.findByIdAndDelete(review._id);
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(201).json({ message: "Review submitted successfully", review });
    } catch (error) {
        console.error("Error in createReview controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


export async function deleteReview(req, res) {
    try {
        const { reviewId } = req.params;
        const user = req.user;
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }
        if (review.userId.toString() !== user._id.toString()) {
            return res.status(403).json({ error: "Not authorized to delete this review" });
        }

        const productId = review.productId;
        await Review.findByIdAndDelete(reviewId);

        // after delting the review you have to delete the rating also both are at same time to do so we have to delete both 
        const reviews = await Review.find({ productId });
        const totalRating = reviews.reduce((sum, rev) => sum + rev.rating, 0);
        await Product.findByIdAndUpdate(productId, {
            averageRating: reviews.length > 0 ? totalRating / reviews.length : 0,
            totalReviews: reviews.length,
        });
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        console.error("Error in deleteReview controller:", error);
        res.status(500).json({ error: "Internal server error" });

    }
}



// 1. User sends rating
// 2. Check rating valid
// 3. Check order exists
// 4. Check order belongs to user
// 5. Check order delivered
// 6. Check product was actually bought
// 7. Create/update review
// 8. Recalculate average rating
// 9. Update product
// 10. Send success response