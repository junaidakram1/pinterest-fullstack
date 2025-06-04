import express from "express";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
const router = express.Router();

router.delete("/", async (req, res) => {
  const info = await User.deleteOne({ username: "test" });
  res.json(info);

  res.json("user created.");
});

export default router;
