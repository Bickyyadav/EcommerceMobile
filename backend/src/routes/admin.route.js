import { Router } from "express";
import { adminOnly, protectRoute } from "../middleware/auth.middleware.js";
import { createProducts, deleteProduct, getAllCustomers, getAllOrders, getAllProducts, getDashboardStats, updateOrderStatus, updateProduct } from "../controllers/admin.controller.js";
import { upload } from "../middleware/multer.middleware.js";


const router = Router();

router.use(protectRoute, adminOnly)

//for create products
//use this images name in the frontend 
router.post("/products", upload.array("images", 3), createProducts)
router.get("/products", getAllProducts)
router.put("/products/:id",upload.array("images", 3), updateProduct)
router.delete("/products/:id", deleteProduct)
// get all orders
router.get("/orders", getAllOrders)
// update order status from pending to shift and shift to delivery
router.patch("/orders/:orderId/status", updateOrderStatus)
// get all customer
router.get("/customers", getAllCustomers)
router.get("/stats", getDashboardStats)


// different between order and patch
//PUT: in put the admin will update the entire product details like name , description , image and other all thigns 
//Patch: in pathc only some part like shirt to delivery and delivery to cancel 

export default router;
