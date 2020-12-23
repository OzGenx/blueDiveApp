import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// @desc Authenticate user & get token
// @route POST /api/users/login
// @access Public (Public does not require a token to access)
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })

    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// @desc Register a new user
// @route POST /api/users
// @access Public (Public does not require a token to access)
const registerUser = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, password } = req.body

    const userExists = await User.findOne({ email })

    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        firstname,
        lastname,
        email,
        password
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})


// @desc Authenticate user profile
// @route GET /api/users/profile
// @access Private (Private requires access token )
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user) {
        res.json({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            isAdmin: user.isAdmin
        })

    } else {
        res.status(404)
        throw new Error('User not found')
    }

})

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private (Private requires access token )
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user) {
        user.firstname = req.body.firstname || user.firstname
        user.lastname = req.body.lastname || user.lastname
        user.email= req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            firstname: updatedUser.firstname,
            lastname: updatedUser.lastname,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })

    } else {
        res.status(404)
        throw new Error('User not found')
    }

})

// @desc getAllUsers
// @route GET /api/users
// @access Private/Admin (Private requires access token )
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

// @desc delete a user
// @route Delete /api/users/:id
// @access Private/Admin (Private requires access token )
const deleteUser = asyncHandler(async (req, res) => {
    const users = await User.findById(req.params.id)
    
    if(user) {
        await user.remove()
        res.json({ message: 'User removed' })
    } else {
        res.status(404)
        throw new Error('Unable to process request')
    }
})

// @desc get user by id
// @route GET /api/users/:id
// @access Private/Admin (Private requires access token )
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if(user) {
    res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc Update user 
// @route PUT /api/users/:id
// @access Private/admin (Private requires access token )
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(user) {
        user.firstname = req.body.firstname || user.firstname
        user.lastname = req.body.lastname || user.lastname
        user.email= req.body.email || user.email
        user.isAdmin= req.body.isAdmin

        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            firstname: updatedUser.firstname,
            lastname: updatedUser.lastname,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })

    } else {
        res.status(404)
        throw new Error('User not found')
    }

})
export { authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser }