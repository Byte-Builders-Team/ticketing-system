const Ticket = require("../models/tickets-model");
const validator = require("../utils/validator.js");
const moment = require("moment");

// Create a new ticket
const createTicket = async (req, res) => {
  try {
    const body = req.body;
    const requiredFields = ["title", "status", "create_by", "category"];
    if (!validator.isBodyValid(body, requiredFields)) {
      return res.status(400).json({
        success: false,
        error: "Invalid Ticket Info provided. Please ensure it is correct.",
      });
    }

    const ticket = new Ticket(body);
    if (!ticket) {
      return res.status(400).json({
        success: false,
        error:
          "Ticket not created. Please ensure the required information is provided.",
      });
    }
    if (body && body.end_date) {
      const parsedDate = moment(ticket.end_date, "YYYY-MM-DD", true); // true enables strict parsing
      if (!parsedDate.isValid()) {
        return res.status(400).json({
          success: false,
          error:
            "Invalid date format. Please provide a valid date in YYYY-MM-DD format.",
        });
      }
    }

    ticket
      .save()
      .then(() => {
        return res.status(201).json({
          success: true,
          ticket,
          message: "Ticket created successfully.",
        });
      })
      .catch((err) => {
        return res
          .status(400)
          .json({ err, message: "Failed to create ticket!" });
      });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: "Failed to create ticket. Please try again later.",
    });
  }
};
// Update a ticket by ID
const updateTicket = async (req, res) => {
  
  const ticketId = req.params.id;
  const body = req.body;

  try {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        error: "Ticket not found. Please provide a valid Ticket ID.",
      });
    }
  } catch (error) {
    // Handle validation errors and other unexpected errors
    return res.status(500).json({
      success: false,
      error: "An error occurred while retrieving the ticket information.",
    });
  }

  try {
    if (body && body.status) {
      // Check if the new status value is a valid enum value
      if (!["open", "close", "in_progress", "hold"].includes(body.status)) {
        return res.status(400).json({
          success: false,
          error: "Invalid status value. Please provide a valid status.",
        });
      }
    }
    if (body && body.end_date) {
      // Parse the 'end_date' value from the ticket document as a moment.js date object
      const parsedDate = moment(body.end_date, "YYYY-MM-DD", true);
      // Check if the parsed date is valid
      if (!parsedDate.isValid()) {
        return res.status(400).json({
          success: false,
          error:
            "Invalid date format. Please provide a valid date in YYYY-MM-DD format.",
        });
      }
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(ticketId, body);

    // Check if the ticket was found and updated successfully
    if (!updatedTicket) {
      return res.status(404).json({
        success: false,
        error: "Ticket not found. Please provide a valid Ticket ID.",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Ticket Updated!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "An error occurred while updating the ticket.",
    });
  }
};

const updateTicketStatus = async (req, res) => {
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
}};

// Pick up a ticket by ID
const pickUpTicket = async (req, res) => {
  //todo
};

// Pick down a ticket by ID
const pickDownTicket = async (req, res) => {

  try{
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, { "Assign_to": null });  
    
    return res.status(201).json({
      success: true,
      message: "Ticket picked down!",
    });
    
  }catch(err){

    return res.status(400).json({
      success: false,
      error: "Invalid Ticket Info provided. Please ensure it is correct.",
    });


  }


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
  updateTicketStatus,
};
