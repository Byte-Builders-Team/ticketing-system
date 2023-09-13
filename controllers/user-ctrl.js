const User = require("../models/user-model");
const validator = require('../utils/validator.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
dotenv.config()



const createUser = async (req, res) => {
    //check if body valid 
    const body = req.body
    const requiredFields = ["username", "email", "display_name", "password", "is_admin", "phone_number"];
    if (!validator.isBodyValid(body, requiredFields)) {
        
        return res.status(400).json({ success: false, error: 'You must provide a User Info!' });
    }


    //create user
    const user = new User(body);
    if (!user) {
        return res.status(400).json({ success: false, error: 'User does not created!' })
    }


    //hash user password 
    try {
        user.password = await bcrypt.hash(user.password, +process.env.SALTROUNDS);
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
    const requiredFields = ["username", "email", "display_name", "password", "is_admin"];



    if (!validator.isBodyValid(body, requiredFields)) {

        return res.status(400).json({ error: "no the body" });
    }
    try{
    // Find the user by ID and update their data
    const updatedUser = await User.findByIdAndUpdate(userId, body);
    
    if (!updatedUser) {
        // If the user with the given ID doesn't exist, return a 404 Not Found response
        return res.status(404).json({ error: 'User not found' });
    }

    updatedUser.save().then(() => {
        return res.status(201).json({
            success: true,
            message: 'User Updated!',
        });

    }).catch(err => {
        return res.status(400).json({ err, message: 'User does not Updated!' })
    });
}catch(err){
    return res.status(400).json({ error: "User does not found" });
};

}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findOneAndRemove({ _id: id });

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getUserbyId = async (req, res) => {
    try {
        //get user from DB.
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(400).json({ success: false, error: 'User does not exist!', })
        } else {
            return res.status(201).json({ user })
        }

    } catch (err) {
        return res.status(400).json({ err, message: 'Can not get user from DB!', })
    }
}


const getUsers = async (req, res) => {
    //get list of user from DB 
    try{
        const users = await User.find();
        if (!users) {
            return res.status(400).json({ success: false, error: 'No users', })
        }

        return res.status(201).json({ users })

    }catch(err){
        return res.status(500).json({ success: false, error: err.message })
    }
}



//export methods ... 
module.exports = { createUser , updateUser , deleteUser , getUserbyId , getUsers }
