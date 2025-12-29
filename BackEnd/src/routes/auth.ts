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
  // if (!req.body.username || !req.body.password) {
  //   return res
  //     .status(400)
  //     .json({ error: "Username and password are required" });
  // }

  const { username, name, password } = req.body;

  // Basic validation
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
  const user = await db.User.create({
    name: name,
    username: username,
    password: hashed,
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
    },
  });
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate user with username and password. Returns access token and sets refresh token in secure HTTP-only cookie.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 format: password
 *                 example: SecurePassword123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 user:
 *                   type: string
 *                   example: John Doe
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: refreshToken=abcd1234; Path=/auth/refresh; HttpOnly; SameSite=Lax
 *       400:
 *         description: Invalid credentials or missing request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Username and password are required
 *                 error:
 *                   type: string
 *                   example: Invalid credentials
 */
router.post("/login", async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Missing request body" });
  }
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required",
    });
  }

  console.log("Login attempt:", { username });
  const user = await db.User.findOne({ where: { username } });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Invalid credentials" });

  const access = createAccessToken({ name: user.name });
  const refresh = createRefreshToken({ name: user.name });

  // TODO: Handle password reset logic

  res.cookie("refreshToken", refresh, {
    httpOnly: true,
    secure: false, // Set to true in production
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
