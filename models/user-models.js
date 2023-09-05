const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
{
        username: { type: String, required: true , unique: true },
        email: { type: String, required: true , unique: true },
        display_name: { type: String, required: true },
        password: { type: String, required: true },
        is_admin: { type: Boolean, required: true },
        phone_number: {type: String}
},
{ timestamps: true },

)
module.exports = mongoose.model('users', User)