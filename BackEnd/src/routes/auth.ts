import { Router } from "express";
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";
import cookieParser from "cookie-parser";
import db from "../database/models";
import bcrypt from "bcrypt";

const router = Router();
router.use(cookieParser());

// Register endpoint
router.post("/register", async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Missing request body" });
  }

  const { username, name, password } = req.body;

  if (!username || !name || !password) {
    return res.status(400).json({
      success: false,
      message: "Username, name and password are required",
    });
  }
  const exists = await db.User.findOne({ where: { username } });
  if (exists) return res.status(409).json({ error: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);

  console.log("Registration attempt:", { username });
  try {
    const user = await db.User.create({
      name: name,
      username: username,
      password: hashed,
    });
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Missing request body" });
  }
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      error: "Username and password are required",
    });
  }

  console.log("Login attempt:", { username });
  const user = await db.User.findOne({ where: { username } });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const access = createAccessToken({ id: user.id });
  const refresh = createRefreshToken({ id: user.id });

  // TODO: Handle password reset logic

  res.cookie("refreshToken", refresh, {
    httpOnly: true,
    secure: false, // TODO: Set to true when deployed
    sameSite: "lax",
    path: "/auth/refresh",
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
    user: user.name,
    token: access,
  });
});

router.post("/refresh", async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ error: "Missing refresh token" });

  try {
    const decoded: any = verifyRefreshToken(token);

    const user = await db.User.findByPk(decoded.id);
    if (!user) throw new Error("No user");

    const access = createAccessToken({ id: user.id });
    res.json({ access });
  } catch (err) {
    res.status(403).json({ error: "Invalid refresh token" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    path: "/auth/refresh",
  });

  return res.status(200).json({ succes: true });
});

export default router;
