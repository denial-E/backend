import express from "express";
import { forgotPassword, login, resetPassword, signIn } from "../Controllers/auth.controller.js";




const router = express.Router();

router.post("/register", signIn); //http://localhost:4000/api/auth/register
router.post("/login", login); //http://localhost:4000/api/auth/login
router.post("/forget-password",forgotPassword); //http://localhost:4000/api/auth/forget-password
router.post("/reset-password/:token",resetPassword); //http://localhost:4000/api/auth/reset-password/:token









export default router;