import User from"../Models/auth.schema.js";
import Ticket from"../Models/ticket.schema.js";

// ADMIN: get all users
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// ADMIN: get user details
export const getUserDetails = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  const tickets = await Ticket.find({ user: req.params.id });

  res.json({ user, tickets });
};

// ADMIN: get all tickets
export const getAllTickets = async (req, res) => {
  const tickets = await Ticket.find().populate("user", "name email");
  res.json(tickets);
};

// ADMIN: update ticket
export const updateTicket = async (req, res) => {
  const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(ticket);
};

// ADMIN: delete any ticket
export const deleteTicket = async (req, res) => {
  await Ticket.findByIdAndDelete(req.params.id);
  res.json({ msg: "Ticket deleted by admin" });
};
