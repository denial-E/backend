import Ticket from "../Models/ticket.schema.js";

// USER → Create ticket
export const createTicket = async (req, res) => {
  try {
    const ticket = await Ticket.create({
      title: req.body.title,
      description: req.body.description,
      createdBy: req.user._id,
    });
    res.json({ message: "Ticket created", ticket });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// USER → Get only OWN tickets
export const getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ createdBy: req.user._id });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// USER → Update OWN ticket
// export const updateMyTicket = async (req, res) => {
//   try {
//     const ticket = await Ticket.findOne({
//       _id: req.params.id,
//       createdBy: req.user._id,
//     });

//     if (!ticket) return res.status(404).json({ message: "Ticket not found" });

//     Object.assign(ticket, req.body);
//     await ticket.save();

//     res.json({ message: "Ticket updated", ticket });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// USER → Delete OWN ticket
export const deleteMyTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
      if (ticket.user.toString() !== req.user.id)
        return res.status(403).json({ msg: "You can delete only your ticket" });

      await ticket.deleteOne();

    res.json({ message: "Ticket deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
