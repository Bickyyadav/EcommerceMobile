import { User } from "../models/user.model.js";

export const handleClerkWebhook = async (req, res) => {
    try {
        console.log("🔴🔴🔴🔴🔴🔴");
        const { type, data } = req.body;
        console.log("🚀 ~ Clerk Webhook Received:", type);

        // Handle user.created and user.updated events
        if (type === "user.created" || type === "user.updated") {
            const {
                id: clerkId,
                email_addresses,
                first_name,
                last_name,
                image_url,
            } = data;

            const email = email_addresses[0]?.email_address;
            const name = first_name
                ? `${first_name} ${last_name || ""}`.trim()
                : email?.split("@")[0] || "User";

            // Upsert user in database
            const user = await User.findOneAndUpdate(
                { clerkId },
                {
                    clerkId,
                    name,
                    email,
                    imageUrl: image_url,
                },
                { upsert: true, new: true }
            );

            console.log(`✅ User ${type === "user.created" ? "created" : "updated"}:`, user.email);
            return res.status(200).json({ success: true, message: "User synced successfully" });
        }

        // Handle user.deleted event
        if (type === "user.deleted") {
            const { id: clerkId } = data;
            await User.findOneAndDelete({ clerkId });
            console.log("❌ User deleted from DB:", clerkId);
            return res.status(200).json({ success: true, message: "User deleted successfully" });
        }

        // Return 200 for other event types to acknowledge receipt
        res.status(200).json({ success: true, message: "Webhook received" });
    } catch (error) {
        console.error("❌ Error in Clerk Webhook Controller:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

