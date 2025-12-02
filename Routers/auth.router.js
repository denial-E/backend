import express from "express";
import { ResetPassword, forgotPassword,login, register} from "../Controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register); //http://localhost:4000/api/auth/register
router.post("/login", login); //http://localhost:4000/api/auth/login
router.post("/forgot-password", forgotPassword); //http://localhost:4000/api/auth/forgot-password
router.post("/reset-password/:token", ResetPassword); //http://localhost:4000/api/auth/reset-password/:token
// router.get("/getusers", );//http://localhost:4000/api/user/getusers








export default router;