import { Router } from "express";
import { adminOnly, protectRoute } from "../middleware/auth.middleware";
import { createProducts, deleteProduct, getAllProducts, updateProduct } from "../controllers/admin.controller";
import { upload } from "../middleware/multer.middleware";


const router = Router();

router.use(protectRoute, adminOnly)

//use this images name in the frontend 
router.post("/products", upload.array("images", 3), createProducts)
router.get("/products", getAllProducts)
router.put("/products/:id",upload.array("images", 3), updateProduct)
router.delete("/products/:id", deleteProduct)


export default router;
