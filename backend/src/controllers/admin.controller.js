import { Product } from "../models/product.model";

export async function createProducts(req, res) {
    try {
        const { name, description, price, stock, category } = req.body;
        if (!name || !description || !price || !stock || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "At least one image is required" });
        }
        if (req.files.length > 3) {
            return res.status(400).json({ message: "Maximum 3 images allowed" });
        }
        const uploadPromises = req.files.map((file) => {
            return cloudinary.uploader.upload(file.path, {
                folder: "products",
            });
        });
        // [
        //   Promise,
        //   Promise,
        //   Promise
        // ]
        // Nothing uploaded yet fully — just promises created
        const uploadResults = await Promise.all(uploadPromises);
        // Extract only URLs
        const imageUrls = uploadResults.map((result) => result.secure_url);
        const product = await Product.create({
            name,
            description,
            price: parseFloat(price),
            stock: parseInt(stock),
            category,
            images: imageUrls,
        });
        res.status(201).json(product);
    } catch (error) {
        console.error("Error creating product", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getAllProducts(req, res) {

}

export async function updateProduct(req, res) {

}

export async function deleteProduct(req, res) {

}
