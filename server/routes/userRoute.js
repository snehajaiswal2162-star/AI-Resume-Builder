const express = require('express')
const { registerUser, loginUser, getUserById, getUserResume } = require('../controllers/userController')
const protect = require('../middlewares/authMiddleware')

const userRoute = express.Router()

userRoute.post('/register', registerUser)
userRoute.post('/login',loginUser)
userRoute.get('/data',protect, getUserById)
userRoute.get('/resume', protect , getUserResume)

module.exports = userRoute