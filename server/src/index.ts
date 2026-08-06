import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import "./db";
import reviewsRouter from "./routes/reviews";
import galleryRouter from "./routes/gallery";
import contactRouter from "./routes/contact";
import adminRouter from "./routes/admin";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use("/api/reviews", reviewsRouter);
app.use("/api/gallery", galleryRouter);
app.use("/api/contact", contactRouter);
app.use("/api/admin", adminRouter);

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Triz Contracting API listening on http://localhost:${PORT}`);
});
