import type { Request, Response, NextFunction } from "express";
import crypto from "crypto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "changeme";
const tokens = new Set<string>();

export function login(password: string): string | null {
  if (password !== ADMIN_PASSWORD) return null;
  const token = crypto.randomBytes(24).toString("hex");
  tokens.add(token);
  return token;
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token || !tokens.has(token)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}
