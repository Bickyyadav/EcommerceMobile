import { requireAuth } from "@clerk/express";
import { User } from "../models/user.model.js";
import { ENV } from "../config/env.js";


export const protectRoute = [
    requireAuth(),
    async (req, res, next) => {
        try {
            const clerkId = req.auth.userId;
            if (!clerkId) return res.status(401).json({ message: "Unauthorized - invalid token" });

            let user = await User.findOne({ clerkId });
            
            // Note: If user is null, it might be because the webhook hasn't processed yet.
            // You can either return an error or handle it as "not fully synced".
            if (!user) {
                return res.status(404).json({ message: "User not found in database. Please wait for sync or try re-logging." });
            }

            req.user = user;
            next();
        } catch (error) {
            console.error("Error in protectRoute middleware", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
];