import User from "../Models/auth.schema.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sendEmail from "../utils/sendEmail.js";

dotenv.config();

export const signIn = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json({ message: "User registered", user });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: `User with ${User.email} mail id already exists`,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Register Failed,Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await user.comparePassword(password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
    res.status(200).json({ message: "User logged successfully", token });
  } catch (error) {
    res.status(500).json({ error: "loggin failed" });
  }
};
export const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: "Email not found" });
    console.log(user)
    user.resetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetToken = resetToken;
    console.log("TOKEN SENT TO EMAIL:", resetToken);
    user.resetTokenExpire = Date.now() + 10 * 60 * 1000;
    await user.save();
    const url = `${resetToken}`;
    await sendEmail(user.email, "Password Reset", `Reset Link: ${url}`);

    res.status(200).json({ message: "Reset link sent" });
  } catch (error) {
    res.status(500).json({ error: "forgot failed" });
  }
};
export const resetPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      resetToken: req.params.token,
      resetTokenExpire: { $gt: Date.now() },
    });
    console.log("TOKEN RECEIVED IN URL:", req.params.token);

    const foundUser = await User.findOne({ resetToken: req.params.token });
    console.log("FOUND USER:", foundUser);

    if (!user) return res.status(400).json({ message: "Token invalid" });

    user.password = req.body.password;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    await user.save();

    res.status(200).json({ message: "Password updated" });
  } catch (error) {
    res.status(500).json({ error: "reset failed" });
  }
};
