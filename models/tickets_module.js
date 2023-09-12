
const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  title: { type: String, required: true,},
  description: { type: String, required: true, },
  created_at: {  type: Date,  default: Date.now,},
  updated_at: { type: Date, default: Date.now, },
  end_date: { type: Date, },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users',   required: true,},
  category: { type: String,},
});

const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;
