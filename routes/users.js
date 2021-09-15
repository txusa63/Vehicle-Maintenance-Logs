const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const auth = require('../middleware/auth');


router.post('/register', async (req, res) => {
    try {
        let {firstName, lastName, email, password, passwordCheck, role, displayName, gender} = req.body;

        if(!firstName || !lastName || !email || !password || !passwordCheck || !role || !gender) {
            return res.status(400).json({msg: 'Please enter all required fields'});
        }
        firstName = firstName.toUpperCase();
        lastName = lastName.toUpperCase();

        if(password.length < 5) {
            return res.status(400).json({msg: 'Password needs to be at least 5 characters long...'});
        }

        if(password !== passwordCheck) {
            return res.status(400).json({msg: 'The given passwords did not match!'});
        }

        role = role.toUpperCase();
        gender = gender.toUpperCase();

        const existingUser = await User.findOne({email: email})
        if(existingUser) {
            return res.status(400).json({msg: 'Account with this email already exists...'});
        }

        if(!displayName) {
            if(role === 'ADMIN') {
                displayName = role
            }
            else {
                displayName = firstName + ' ' + lastName;
            }
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName, 
            email,
            passwordHash,
            role,
            displayName,
            gender
        });
        const savedUser = await newUser.save();

        const token = JWT.sign({user: savedUser._id}, process.env.JWT_SECRET);

        res.cookie('token', token, {httpOnly: true, secure: true, sameSite: 'none'}).send();
    }

    catch(err) {
        console.error(err);
        res.status(500).json({error: err.message});
    }
});


router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({msg: 'Please enter all required fields'});
        }

        const existingUser = await User.findOne({email: email});
        if(!existingUser) {
            return res.status(401).json({msg: 'Wrong email and/or password'});
        }

        const isMatch = await bcrypt.compare(password, existingUser.passwordHash);
        if(!isMatch) {
            return res.status(401).json({msg: 'Wrong email and/or password'});
        }

        const token = JWT.sign({user: existingUser._id}, process.env.JWT_SECRET);

        res.cookie('token', token, {httpOnly: true, secure: true, sameSite: 'none'}).send();

    }

    catch(err) {
        console.error(err);
        res.status(500).json({error: err.message});
    }
});


router.get('/isLoggedIn', (req, res) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            return res.json(false);
        }

        const verified = JWT.verify(token, process.env.JWT_SECRET);

        res.send(true);
    } 
    
    catch (err) {
        res.json(false)
    }
});

router.get('/adminExists', async (req, res) => {
    try {
        const role = await User.findOne({role: 'ADMIN'});
        if(!role) { 
            return res.json(false)
        }

        res.send(true)
    } 
    
    catch (err) {
        res.json(false)
    }
})


router.get('/logout', (req, res) => {
    res.cookie('token', '', {httpOnly: true, expires: new Date(0), secure: true, sameSite: 'none'}).send()
});

// Check this out later
router.get('/all', auth, async (req, res) => {
    const users = await User.find();
    res.json(users)
});


router.get('/', auth, async (req, res) => {
    const user = await User.findOne({_id: req.user});
    if(!user) {
        return res.status(400).json({msg: 'No user found!'});
    }
    res.json(user);
});


router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
});


router.put('/update/:id', async (req, res) => {
    const {id} = req.params;

    let {firstName, lastName, email, password, passwordCheck, role, displayName, gender} = req.body;
    const currentEmail = email

    if(!firstName || !lastName || !email || !password || !passwordCheck || !role || !gender) {
        return res.status(400).json({msg: 'Please enter all required fields'});
    }
    firstName = firstName.toUpperCase();
    lastName = lastName.toUpperCase();

    if(password.length < 5) {
        return res.status(400).json({msg: 'Password needs to be at least 5 characters long...'});
    }

    if(password !== passwordCheck) {
        return res.status(400).json({msg: 'The given passwords did not match!'});
    }

    role = role.toUpperCase();
    gender = gender.toUpperCase();

    if(email !== currentEmail) {
        const existingUser = await User.findOne({email: email})
        if(existingUser) {
            return res.status(400).json({msg: 'Account with this email already exists...'});
        }
    }

    if(!displayName) {
        if(role === 'ADMIN') {
            displayName = role
        }
        else {
            displayName = firstName + ' ' + lastName;
        }
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const updatedUser = {_id: id, firstName, lastName, email, passwordHash, role, displayName, gender};
    await User.findByIdAndUpdate(id, updatedUser);
    res.json(updatedUser);
})


module.exports = router;