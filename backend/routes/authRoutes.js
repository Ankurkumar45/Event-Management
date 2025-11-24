const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController.js");
const { protect } = require("../middleware/authMiddleware.js");

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', protect, authController.getMe);

module.exports = router