const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// controller for user register
const User = require('../models/User')
const Resume = require('../models/Resume.js')


//token generation
const generateToken = (userId) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET, {expiresIn: '7d'})
    return token
}
//post: /api/users/register
const registerUser = async (req,res) => {
   try {
     const {name,email,password} = req.body

    //check if required fields are present
    if(!name || !email ||!password){
        return res.status(400).json({message:"Missing required fields.", success:false})
    }

    //check if user already exists
    const user = await User.findOne({email})
    if(user){
        return res.status(400).json({message:'user already exists', success:false})
    }

    //create new user
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = await User.create({
        name,email,password:hashedPassword
    })

    //return success message
    const token = generateToken(newUser._id)
    newUser.password = undefined

    return res.status(201).json({message: "User creates successfully", token, user:newUser, success:true})
} 
    catch (error) {
    return res.status(400).json({message:error.message})
    }
}


//controller for login user
//POST: /api/users/login
const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body

       //check if user already exisits
       const user = await User.findOne({email})
       if(!user){
        return res.status(400).json({message: "Invalid email or password",success:false})
       }

       //check if password is right
       if(!user.comparePassword(password)){
        return res.status(400).json({message: "invaild email or password", success:false})
       }

       //return success message
       const token = generateToken(user._id)
       user.password = undefined
       return res.status(200).json({message: "Login successfully", token, user, success:true})

    } catch (error) {
        return res.status(500).json({message:error.message, success:false})
    }
}


//controller for getting user id 
//POST: /api/users/data
const getUserById = async (req,res) => {
    try {
        const userId = req.userId

        //check if user exists
        const user = await User.findById(userId)
        if(!user){
            return res.status(400).json({message: "User not found", success: false})
        }

        //return user
        user.password = undefined
        return res.status(200).json({user})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

//controller for getting user resumes
//POST: /apiusers/resume

const getUserResume = async (req,res) => {
    try {
        const userId = req.userId
        const resume = await Resume.find({userId})
        return res.status(200).json({resume})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserById,
    getUserResume
}