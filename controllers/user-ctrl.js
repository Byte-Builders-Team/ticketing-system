const User = require('../models/user-models.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
dotenv.config()


const loginUser = async (req , res) =>{
    //todo
}

const createUser = async (req,res) => {
    //todo   
}

const updateUser= async (req , res) =>{
    //todo
}

const deleteUser= async (req , res) =>{
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
    

const getUserbyId= async (req , res) =>{
    //todo
}

const getUsers= async (req , res) =>{
    //todo
}



//export methods ... 
module.exports = { createUser , updateUser , deleteUser , getUserbyId , getUsers, loginUser }
