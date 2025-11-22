import express from "express";
import { forgotPassword, getuser, login, register, resetPassword } from "../Controllers/user.controller.js";

const router = express.Router();

router.post("/register", register); //http://localhost:4000/api/users/register
router.post("/login", login); //http://localhost:4000/api/users/login
router.post("/forgot", forgotPassword); //http://localhost:4000/api/users/forgot
router.post("/reset-password/:token", resetPassword); //http://localhost:4000/api/users/reset-password/:token
router.get("/getusers", getuser);//http://localhost:4000/api/user/getusers








export default router;