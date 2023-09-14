const express = require("express");
const router = express.Router();
const ticketCtrl = require("../controllers/tickets-ctrl");
const { checkEmptyRequestBody } = require('../middleware/empty-body');

// console.log({checkEmptyRequestBody: middleware.checkEmptyRequestBody});

// Handle unsupported methods for a route
router.all("/api/tickets/*'", (req, res) => {
  res.status(405).json({ error: "Method Not Allowed" });
});
router.post("/api/tickets", checkEmptyRequestBody,ticketCtrl.createTicket);
router.patch("/api/tickets/:id", checkEmptyRequestBody,ticketCtrl.updateTicket);
router.put("/api/ticketsStatus/:id", ticketCtrl.updateTicketStatus);
router.put("/api/tickets/pickup/:id", ticketCtrl.pickUpTicket);
router.put("/api/tickets/pickdown/:id", ticketCtrl.pickDownTicket);
router.delete("/api/tickets/:id", ticketCtrl.deleteTicket);
router.get("/api/tickets", ticketCtrl.readTickets);
router.get("/api/tickets/:id", ticketCtrl.readTicketById);

// PATCH is for partial updates, where you send only the changes.
// PUT is for full updates, where you send the complete resource representation to replace the existing resource.
module.exports = router;
