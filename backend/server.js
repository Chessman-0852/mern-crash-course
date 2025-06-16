import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// API Routes
app.use("/api/products", productRoutes);

// Static files (both development and production)
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Client-side routing (SPA fallback)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// Database connection and server start
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server running in ${
          process.env.NODE_ENV || "development"
        } mode on port ${PORT}`
      );
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
    process.exit(1);
  });
