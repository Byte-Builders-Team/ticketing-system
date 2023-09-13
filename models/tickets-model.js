const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  title: { type: String, required: true},
  description: { type: String, },
  status: { type: String, enum: ["Open", "Close", "In Progress", "Hold"] , default: "Open", required: true},
  end_date:{ type: Date },
  create_by: { type: Schema.Types.ObjectId, ref: User, required: true},
  Assign_to: { type: Schema.Types.ObjectId, ref: User },
  category:{ type: Schema.Types.ObjectId, ref: Category, required: true},
});

const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;
