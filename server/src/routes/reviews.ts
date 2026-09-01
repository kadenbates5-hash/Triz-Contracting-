import { Router } from "express";
import { db } from "../db";
import { requireAdmin } from "../adminAuth";

const router = Router();

router.get("/", (_req, res) => {
  const rows = db
    .prepare("SELECT * FROM reviews WHERE status = 'approved' ORDER BY created_at DESC")
    .all();
  res.json(rows);
});

router.post("/", (req, res) => {
  const { name, rating, text } = req.body as { name?: string; rating?: number; text?: string };
  if (!name?.trim() || !text?.trim() || !Number.isInteger(rating) || rating! < 1 || rating! > 5) {
    res.status(400).json({ error: "name, rating (1-5), and text are required" });
    return;
  }
  const info = db
    .prepare("INSERT INTO reviews (name, rating, text, status) VALUES (?, ?, ?, 'pending')")
    .run(name.trim().slice(0, 100), rating, text.trim().slice(0, 2000));
  const row = db.prepare("SELECT * FROM reviews WHERE id = ?").get(info.lastInsertRowid);
  res.status(201).json(row);
});

router.get("/admin/pending", requireAdmin, (_req, res) => {
  const rows = db
    .prepare("SELECT * FROM reviews WHERE status = 'pending' ORDER BY created_at DESC")
    .all();
  res.json(rows);
});

router.patch("/admin/:id/approve", requireAdmin, (req, res) => {
  db.prepare("UPDATE reviews SET status = 'approved' WHERE id = ?").run(req.params.id);
  const row = db.prepare("SELECT * FROM reviews WHERE id = ?").get(req.params.id);
  if (!row) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(row);
});

router.delete("/admin/:id", requireAdmin, (req, res) => {
  db.prepare("DELETE FROM reviews WHERE id = ?").run(req.params.id);
  res.json({ ok: true });
});

export default router;
