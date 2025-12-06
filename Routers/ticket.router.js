import express from "express";
import { createTicket, getAllTickets } from "../Controllers/ticket.controller.js";
import { authmiddleware } from "../middleware/authmiddleware.js";
import { roleMiddleware } from "../middleware/rolemiddleware.js";


const router = express.Router();

router.post("/create", authmiddleware, createTicket); //http://localhost:4000/api/ticket/create
router.get("/getalltickets", authmiddleware,roleMiddleware(["Admin"]),getAllTickets); //http://localhost:4000/api/ticket/getalltickets
router.get("/getuserticket", authmiddleware, getAllTickets ); //http://localhost:4000/api/ticket/getalltickets















export default router;