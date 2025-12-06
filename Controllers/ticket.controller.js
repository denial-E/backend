import Ticket from "../Models/ticket.schema.js";

export const createTicket = async (req, res) => {
  try {
    const ticket = await Ticket.create({
      title: req.body.title,
      description: req.body.description,
      createdBy: req.user.id,
    });
    res.status(200).status(200).json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL TICKETS (Admin only)
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// GET USER-TICKETS (user sees only their own)
export const getUserTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({ createdBy: req.user.id });
        res.status(200).json(tickets);
    } catch (err) {
         res.status(500).json({ message: err.message });
    }
    
};


// UPDATE TICKET (Admin only)
export const updateTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(ticket);
    } catch (error) {
        
    }
}; 