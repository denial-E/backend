import express from "express";
import { createTicket, deleteMyTicket, getMyTickets } from "../Controllers/ticket.controller.js";
import { authMiddleware } from "../middleware/athMiddleware.js";
import { roleMiddleware } from "../middleware/rolemiddleware.js";


const router = express.Router();
router.post("/create", authMiddleware, roleMiddleware("user", "admin"),createTicket);//http://localhost:4000/api/ticket/create
router.get("/getticket",authMiddleware,roleMiddleware("user"), getMyTickets);//http://localhost:4000/api/ticket/getticket

router.delete("/delete/:id",authMiddleware,roleMiddleware("user"),deleteMyTicket);//http://localhost:4000/api/ticket/delete/:id




export default router;