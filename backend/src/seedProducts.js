import { connectDB } from "./config/db.js";
import { Product } from "./models/product.model.js";
import mongoose from "mongoose";

const products = [
  {
    title: "Wireless Noise-Canceling Headphones",
    description: "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and high-fidelity sound.",
    price: 299.99,
    stock: 50,
    category: "Electronics",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop"],
    averageRating: 4.8,
    totalReviews: 120
  },
  {
    title: "Minimalist Leather Wallet",
    description: "Slim, genuine leather wallet with RFID blocking technology and quick-access card slots.",
    price: 45.00,
    stock: 200,
    category: "Accessories",
    images: ["https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop"],
    averageRating: 4.5,
    totalReviews: 85
  },
  {
    title: "Smart Fitness Watch",
    description: "Track your workouts, heart rate, and sleep with this water-resistant smart fitness watch.",
    price: 199.50,
    stock: 75,
    category: "Electronics",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop"],
    averageRating: 4.2,
    totalReviews: 310
  },
  {
    title: "Organic Cotton T-Shirt",
    description: "Ultra-soft, breathable, and sustainably sourced organic cotton t-shirt for everyday wear.",
    price: 25.00,
    stock: 150,
    category: "Clothing",
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop"],
    averageRating: 4.6,
    totalReviews: 54
  },
  {
    title: "Stainless Steel Water Bottle",
    description: "Double-wall vacuum insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 35.00,
    stock: 300,
    category: "Home & Kitchen",
    images: ["https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1000&auto=format&fit=crop"],
    averageRating: 4.9,
    totalReviews: 420
  },
  {
    title: "Professional DSLR Camera",
    description: "Capture stunning photos and 4K videos with this versatile and high-performance DSLR camera.",
    price: 1299.00,
    stock: 15,
    category: "Electronics",
    images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop"],
    averageRating: 4.7,
    totalReviews: 88
  }
];

const seedDB = async () => {
  try {
    // Connect to the database
    await connectDB();
    
    // Clear existing products (optional, uncomment if you want to start fresh)
    // await Product.deleteMany();
    // console.log("Cleared existing products");

    // Insert new products
    await Product.insertMany(products);
    console.log("Successfully seeded products to the database!");

    // Close connection
    mongoose.connection.close();
    console.log("Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

seedDB();
