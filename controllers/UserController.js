const asyncHandler = require('express-async-handler')
const User = require('../models/UserModel')
const generateToken = require("../config/generateToken")

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body

    if(!username || !email || !password){
        res.status(400)
        throw new Error('Please fill in the required fields.')
    }

    const userExists = await User.findOne({username})

    const userExistsByEmail = await User.findOne({email})

    if(userExistsByEmail) {
        res.status(400)
        throw new Error('Already exists a user account with this email address. Please use another one.')
    }

    if(userExists) {
        res.status(400)
        throw new Error('Already exists a user account with this username. Please use another one.')
    }

    const user = await User.create({
        username, email, password
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Could not create the user.')
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const {username, password} = req.body

    const user = await User.findOne({username})

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid Email or Password.')
    }
})

module.exports = {registerUser, loginUser}


