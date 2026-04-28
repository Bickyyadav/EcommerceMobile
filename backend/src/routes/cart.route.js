import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
    addToCard,
    clearCart,
    getCart,
    removeFromCart,
    updateCartItem,
} from "../controllers/cart.controller.js";

const router = Router();

router.use(protectRoute);

router.get("/", getCart);
router.post("/", addToCard);
router.put("/:productId", updateCartItem);
router.delete("/:productId", removeFromCart);
router.delete("/", clearCart);

export default router;