import { Router } from "express";
import { login } from "../adminAuth";

const router = Router();

router.post("/login", (req, res) => {
  const { password } = req.body as { password?: string };
  const token = login(password || "");
  if (!token) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }
  res.json({ token });
});

export default router;
