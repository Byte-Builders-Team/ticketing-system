const User = require('../models/user-models.js');
const validator = require('../utils/validator.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
dotenv.config()


const loginUser = async (req, res) => {
    //todo
}

const createUser = async (req, res) => {


    //check if body valid 
    const body = req.body
    if (!validator.isBodyValid(body)) {
        return res.status(400).json({ success: false, error: 'You must provide a User Info!' });
    }


    //create user
    const user = new User(body);
    if (!user) {
        return res.status(400).json({ success: false, error: 'User does not created!' })
    }


    //hash user password 
    try {
        user.password = await bcrypt.hash(user.password, 10);
    } catch (err) {
        return res.status(400).json({ success: false, error: 'Issue with hashing the password please make sure to provided all info' + err.message })
    }


    //create user in Database
    user.save().then(() => {
        return res.status(201).json({
            success: true,
            id: user._id,
            message: 'User created!',
        });

    }).catch(err => {
        return res.status(400).json({ err, message: 'User does not created!', })
    });

}

const updateUser = async (req, res) => {

    const userId = req.params.id;
    const body = req.body;


    if (!validator.isBodyValid(body)) {

        return res.status(400).json({ error: "no the body" });
    }

    // Find the user by ID and update their data
    const updatedUser = await User.findByIdAndUpdate(userId, body);

    if (!updatedUser) {
        // If the user with the given ID doesn't exist, return a 404 Not Found response
        return res.status(404).json({ error: 'User not found' });
    }

    updatedUser.save().then(() => {
        return res.status(201).json({
            success: true,
            updatedUser,
            message: 'User Updated!',
        });

    }).catch(err => {
        return res.status(400).json({ err, message: 'User does not Updated!' })
    });

}


const deleteUser = async (req, res) => {
    //todo
}

const getUserbyId = async (req, res) => {
    //todo
}

const getUsers = async (req, res) => {
    //todo
}



//export methods ... 
module.exports = { createUser, updateUser, deleteUser, getUserbyId, getUsers, loginUser }
