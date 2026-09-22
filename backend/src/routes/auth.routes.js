const express = require("express");
const authController = require("../controllers/auth.controllers");
const authMiddleware = require("../middlewares/auth.middlewares");
const router = express.Router();



router.post("/register" , authController.registerUser); 

router.post('/login', authController.loginUser);

router.post('/logout', authController.logOutUser);

router.get('/me', authMiddleware.authUser, authController.getMe);

module.exports = router;