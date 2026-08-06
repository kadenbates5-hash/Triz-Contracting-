import { Router } from "express";
import { db } from "../db";
import { requireAdmin } from "../adminAuth";

const router = Router();

router.post("/", (req, res) => {
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

  db.prepare(
    "INSERT INTO contact_submissions (name, email, phone, project_type, message) VALUES (?, ?, ?, ?, ?)"
  ).run(
    name.trim().slice(0, 100),
    (email || "").trim().slice(0, 200),
    (phone || "").trim().slice(0, 40),
    (projectType || "").trim().slice(0, 200),
    (message || "").trim().slice(0, 4000)
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
