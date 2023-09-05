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
    //todo
}

const getUserbyId= async (req , res) =>{
    //todo
}

const getUsers= async (req , res) =>{
    //todo
}



//export methods ... 
module.exports = { createUser , updateUser , deleteUser , getUserbyId , getUsers, loginUser }
