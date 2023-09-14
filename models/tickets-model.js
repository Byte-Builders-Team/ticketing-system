const mongoose = require('mongoose');
const User = require('../models/user-model');
const Category = require('../models/categories-model');

const TicketSchema = new mongoose.Schema({
  title: { type: String, required: true},
  description: { type: String },
  status: { type: String, enum: ["open", "close", "in_progress", "hold"], default: "open", required: true},
  end_date:{ type: Date },
  create_by: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true},
  Assign_to: { type: mongoose.Schema.Types.ObjectId, ref: User },
  category: { type: mongoose.Schema.Types.ObjectId, ref: Category, required: true},
});

module.exports =  mongoose.model('Ticket', TicketSchema);