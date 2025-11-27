import User from "../Models/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sendEmail  from "../utils/sendEmail.js";
import crypto from 'crypto';
dotenv.config()

export const register = async (req, res) => {
  try {
      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already in use" });
      }

    const hashed = await bcrypt.hash(password, 10);

      const user = await User.create({ name, email, password: hashed });
      await user.save();
      res.status(200).json({ message: "User registered successfully", data:user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Wrong password" });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

    res.status(200).json({ token, data:user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
export const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Email not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
      user.resetToken = hashedToken;
    user.resetTokenExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    const resetURL = `${process.env.CLIENT_URL}/${resetToken}`;

    await sendEmail(
      user.email,
      "Password Reset Request",
      `Reset your password using this link: ${resetURL}`
    );

    res.status(200).json({ message: "Reset email sent" });
  } catch (err) {
     console.log("ERROR RESPONSE:", err.response?.data);
      console.log("STATUS:", err.response?.status);
}
  
};

export const resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      resetToken: req.params.token,
      resetTokenExpire: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ error: "Invalid or expired token" });

    user.password = await bcrypt.hash(req.body.password, 10);
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
export const getuser=async (req, res) => {
  try {
    const user = await User.find(); 
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}