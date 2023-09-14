const Ticket = require("../models/tickets-model");

// Create a new ticket
const createTicket = async (req, res) => {
  try {
    const newTicket = await database.insertTicket(req.body);
    res.json({ message: 'Ticket created', ticket: newTicket });
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.json({ message: 'Ticket creation failed' });
  }
};


// Update a ticket by ID
const updateTicket = async (req, res) => {

  const ticketId = req.params.id;
  const { status } = req.body;

  const validationResult = validateTicketStatusUpdate({ status });

  if (validationResult.error) {

    return res.status(400).json({ error: validationResult.error.details[0].message });
  }
  const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, { status }, { new: true });

  if (!updatedTicket) {

    return res.status(404).json({ error: 'Ticket not found' });
  }


  updatedticket.save().then(() => {
    return res.status(201).json({
      success: true,
      updatedticket,
      message: 'ticket Updated!',
    });

  }).catch(err => {
    return res.status(400).json({ err, message: 'ticket does not Updated!' })
  });
}

const updateTicketStatus = async (req, res) => {
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
  updateTicketStatus
};
