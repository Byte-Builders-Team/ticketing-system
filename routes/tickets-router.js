const express = require('express');
const router = express.Router();
const ticketCtrl = require('../controllers/ticket-ctrl');
const middleware = require('../middleware/authorization'); 

router.post('/tickets', middleware.verifyTokenAndAdmin, ticketCtrl.createTicket);
router.get('/tickets', middleware.verifyTokenAndAdmin, ticketCtrl.getAllTickets);
router.get('/tickets/:id', middleware.verifyTokenAndAdmin, ticketCtrl.getTicketById);
router.put('/tickets/:id', middleware.verifyTokenAndAdmin, ticketCtrl.updateTicketById);
router.delete('/tickets/:id', middleware.verifyTokenAndAdmin, ticketCtrl.deleteTicketById);

module.exports = router;
