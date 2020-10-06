const express = require('express');
const router = express.Router();
const User = require('../models/user_model');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const auth = require('../middleware/auth');

// @route       POST api/users/register
// @desc        Register new user
// @access      Public
router.post('/register', async (req, res) => {
    try {
        let {firstName, lastName, email, password, passwordCheck, role, displayName} = req.body;

        if(!firstName || !lastName || !email || !password || !passwordCheck || !role) {
            return res.status(400).json({msg: 'Not all fields have been entered...'});
        }
        firstName = firstName.toUpperCase();
        lastName = lastName.toUpperCase();

        if(password.length < 5) {
            return res.status(400).json({msg: 'Password needs to be at least 5 characters long...'});
        }

        if(password !== passwordCheck) {
            return res.status(400).json({msg: 'The passwords did not match!'});
        }

        role = role.toUpperCase();

        const existingUser = await User.findOne({email: email})
        if(existingUser) {
            return res.status(400).json({msg: 'Account with this email already exists...'});
        }

        if(!displayName) {
            displayName = firstName + ' ' + lastName;
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName, 
            email,
            password: passwordHash,
            role,
            displayName
        });
        const savedUser = await newUser.save();
        res.json(savedUser);
    }

    catch(err) {
        res.status(500).json({error: err.message});
    }
});

// @route       POST api/users/login
// desc         Auth user and log in if auth successful
// access       Public
router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({msg: 'Not all fields have been entered'});
        }

        const user = await User.findOne({email: email});
        if(!user) {
            return res.status(400).json({msg: 'No account with this email exists'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({msg: 'Invalid credentials'});
        }

        const token = JWT.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: 3600});
        res.json({
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                displayName: user.displayName,
                role: user.role
            }
        });
    }

    catch(err) {
        res.status(500).json({error: err.message});
    }
});

// @route       POST api/users/isTokenValid
// @desc        Test if the token is valid or not
// @access      Public
router.post('/isTokenValid', async (req, res) => {
    try {
        const token = req.header('x-auth-token');
        if(!token) {
            return res.json(false);
        }

        const verified = JWT.verify(token, process.env.JWT_SECRET);
        if(!verified) {
            return res.json(false);
        }

        const user = await User.findById(verified.id);
        if(!user) {
            return res.json(false);
        }

        return res.json(true);
    }

    catch(err) {
        res.status(500).json({error: err.message});
    }
});

// @route       GET api/users/
// @desc        Get user data
// @access      Private
router.get('/', auth, async (req, res) => {
    const user = await User.find(req.user);
    res.json({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        displayName: user.displayName,
    })
});

router.get('/:id', async (req, res) => {
    const user = await User.findOne({_id: req.params.id});
    if(!user) {
        return res.status(400).json({msg: 'No user found!'});
    }
    res.json(user);
})


module.exports = router;