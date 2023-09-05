const express = require('express')
const  middleware = require('../middleware/authorization')
const UserCtrl = require('../controllers/user-ctrl.js')
const router = express.Router()

router.post('/user', middleware.verifyTokenAndAdmin  , UserCtrl.createUser);
router.put('/user/:id', middleware.verifyTokenAndAdmin ,UserCtrl.updateUser);
router.delete('/user/:id', middleware.verifyTokenAndAdmin  , UserCtrl.deleteUser);
router.get('/user/:id', middleware.verifyTokenAndAdmin , UserCtrl.getUserbyId);
router.get('/user', middleware.verifyTokenAndAdmin , UserCtrl.getUsers);
router.post('/login',UserCtrl.loginUser);

module.exports = router
