import express from "express"
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from '@clerk/express'
import path from "path"
import webhookRoutes from "./routes/webhook.routes.js";
import adminRoutes from "./routes/admin.route.js";
import userRoutes from "./routes/user.route.js";
import orderRoutes from "./routes/order.route.js";


const app = express();
app.use(clerkMiddleware())
app.use(express.json())


const __dirname = path.resolve();

app.get("/api/health", (req, res) => {

  res.json({ message: "ok" })
})
app.use("/api/admin",adminRoutes)
app.use("/webhook", webhookRoutes)
app.use("/api/users",userRoutes)
app.use("/api/order",orderRoutes)


if (ENV.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, '../admin/dist')));
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../admin/dist/index.html"))
  })
}


const startServer = async () => {
  await connectDB();
  app.listen(ENV.PORT, () => {
    console.log("Server is up and running");
    console.log(ENV.PORT);
  });
};

startServer();

