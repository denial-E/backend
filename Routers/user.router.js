import express from "express";
import { forgotPassword,login, register, resetPassword } from "../Controllers/user.controller.js";

const router = express.Router();

router.post("/register", register); //http://localhost:4000/api/user/register
router.post("/login", login); //http://localhost:4000/api/user/login
router.post("/forgot-password", forgotPassword); //http://localhost:4000/api/user/forgot-password
router.post("/reset-password/:token", resetPassword); //http://localhost:4000/api/user/reset-password/:token
// router.get("/getusers", );//http://localhost:4000/api/user/getusers








export default router;