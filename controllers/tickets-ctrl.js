const Ticket = require("../models/tickets-model");

// Create a new ticket
const createTicket = async (req, res) => {
  //todo
};

// Update a ticket by ID
const updateTicket = async (req, res) => {
  //todo
};

// Pick up a ticket by ID
const pickUpTicket = async (req, res) => {
  //todo
};

// Pick down a ticket by ID
const pickDownTicket = async (req, res) => {
  //todo
};

// Delete a ticket by ID
const deleteTicket = async (req, res) => {
  //todo
};

// Get a list of all tickets
const readTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching tickets" });
  }
};

// Get a ticket by ID
const readTicketById = async (req, res) => {
  const id = req.params;

  try {
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the ticket" });
  }
};

module.exports = {
  createTicket,
  updateTicket,
  pickUpTicket,
  pickDownTicket,
  deleteTicket,
  readTickets,
  readTicketById,
};
