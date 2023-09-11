const express = require('express');
const router = express.Router();
const ticketCtrl = require('../controllers/tickets');

router.post('/tickets', ticketCtrl.createTicket);
router.put('/tickets/:id', ticketCtrl.updateTicket);
router.put('/tickets/pickup/:id', ticketCtrl.pickUpTicket);
router.put('/tickets/pickdown/:id', ticketCtrl.pickDownTicket);
router.delete('/tickets/:id', ticketCtrl.deleteTicket);
router.get('/tickets', ticketCtrl.readTickets);
router.get('/tickets/:id', ticketCtrl.readTicketById);

module.exports = router;
