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

router.post("/", upload.single("photo"), (req, res) => {
  const { name, email, phone, projectType, message } = req.body as {
    name?: string;
    email?: string;
    phone?: string;
    projectType?: string;
    message?: string;
  };

  if (!name?.trim() || (!email?.trim() && !phone?.trim())) {
    res.status(400).json({ error: "name and either email or phone are required" });
    return;
  }

  const photoPath = req.file ? `/uploads/${req.file.filename}` : null;

  db.prepare(
    "INSERT INTO contact_submissions (name, email, phone, project_type, message, photo_path) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(
    name.trim().slice(0, 100),
    (email || "").trim().slice(0, 200),
    (phone || "").trim().slice(0, 40),
    (projectType || "").trim().slice(0, 200),
    (message || "").trim().slice(0, 4000),
    photoPath
  );

  // NOTE: no outbound email service is configured yet. Submissions are stored
  // here and visible via GET /api/contact/admin (admin-only). Wire up a real
  // email/SMS provider (e.g. Resend, Twilio) here when credentials are available.
  res.status(201).json({ ok: true });
});

router.get("/admin", requireAdmin, (_req, res) => {
  const rows = db.prepare("SELECT * FROM contact_submissions ORDER BY created_at DESC").all();
  res.json(rows);
});

export default router;
