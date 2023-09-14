const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true , unique: true },
  email: { type: String, required: true , unique: true },
  display_name: { type: String, required: true },
  password: { type: String, required: true },
  is_admin: { type: Boolean, required: true },
  phone_number: {type: String},
  deleted: { type: Boolean, default: false }, // Added field for soft delete
},{
  timestamps: true, // This option adds createdAt and updatedAt timestamps.
});

module.exports = mongoose.model('users', UserSchema)
