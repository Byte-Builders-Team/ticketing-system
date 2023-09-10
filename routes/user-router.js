const express = require("express");
const middleware = require("../middleware/authorization");
const UserCtrl = require("../controllers/user-ctrl.js");
const Auth = require("../auth/auth-controller");
const router = express.Router();

// Register & Login
router.post("/login", middleware.verifyTokenAndAdmin, Auth.login);
router.post("/register", Auth.register);

router.post("/user", middleware.verifyTokenAndAdmin, UserCtrl.createUser);
router.put("/user/:id", middleware.verifyTokenAndAdmin, UserCtrl.updateUser);
router.delete("/user/:id", middleware.verifyTokenAndAdmin, UserCtrl.deleteUser);
router.get("/user/:id", middleware.verifyTokenAndAdmin, UserCtrl.getUserbyId);
router.get("/user", middleware.verifyTokenAndAdmin, UserCtrl.getUsers);

module.exports = router;
