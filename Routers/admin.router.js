import express from "express";
import { authMiddleware } from "../middleware/athMiddleware.js";
import { roleMiddleware } from "../middleware/rolemiddleware.js";
import { getAllTickets, getAllUsers, getUserDetails, updateTicket } from "../Controllers/admin.controller.js";
import { deleteMyTicket } from "../Controllers/ticket.controller.js";

const router = express.Router();
router.post("/users",authMiddleware,roleMiddleware("admin"),getAllUsers); //http://localhost:4000/api/ticket/create
router.get("/users/:id", authMiddleware, roleMiddleware("admin"),getUserDetails);//http://localhost:4000/api/ticket/create
router.get("/getticket", authMiddleware, roleMiddleware("admin"), getAllTickets); //http://localhost:4000/api/ticket/getticket
router.put(
  "/update/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateTicket
);//http://localhost:4000/api/ticket/update/:id
router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteMyTicket
); //http://localhost:4000/api/ticket/delete/:id




export default router;