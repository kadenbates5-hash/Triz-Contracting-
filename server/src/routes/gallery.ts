import { Router } from "express";
import multer from "multer";
import path from "path";
import crypto from "crypto";
import { db } from "../db";
import { requireAdmin } from "../adminAuth";

const router = Router();

const storage = multer.diskStorage({
  destination: path.join(__dirname, "..", "..", "uploads"),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).slice(0, 10);
    cb(null, `${crypto.randomUUID()}${ext}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (/^image\/(jpeg|png|webp|gif)$/.test(file.mimetype)) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  },
});

router.get("/", (_req, res) => {
  const rows = db
    .prepare("SELECT * FROM gallery WHERE status = 'approved' ORDER BY created_at DESC")
    .all();
  res.json(rows);
});

router.post(
  "/admin",
  requireAdmin,
  upload.fields([{ name: "before", maxCount: 1 }, { name: "after", maxCount: 1 }]),
  (req, res) => {
    const { title, category } = req.body as { title?: string; category?: string };
    const files = req.files as Record<string, Express.Multer.File[]> | undefined;
    const before = files?.before?.[0];
    const after = files?.after?.[0];
    if (!title?.trim() || !category?.trim() || !before || !after) {
      res.status(400).json({ error: "title, category, before image, and after image are required" });
      return;
    }
    const info = db
      .prepare(
        "INSERT INTO gallery (title, category, before_image, after_image, status) VALUES (?, ?, ?, ?, 'approved')"
      )
      .run(title.trim(), category.trim(), `/uploads/${before.filename}`, `/uploads/${after.filename}`);
    const row = db.prepare("SELECT * FROM gallery WHERE id = ?").get(info.lastInsertRowid);
    res.status(201).json(row);
  }
);

router.delete("/admin/:id", requireAdmin, (req, res) => {
  db.prepare("DELETE FROM gallery WHERE id = ?").run(req.params.id);
  res.json({ ok: true });
});

export default router;
