const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Log = require('../models/log_model');

// @route       POST api/logs
// @desc        Create a log and save to database
// @access      Private
router.post('/', auth, async (req, res) => {
    try {
        const {brandName, modelName, mileage, oilChanged, brakesChecked, lightsChecked, anyDamages} = req.body;

        if(!brandName || !modelName || !mileage || !oilChanged || !brakesChecked || !lightsChecked || !anyDamages) {
            return res.status(400).json({msg: 'Not all fields have been entered...'});
        }

        const newLog = new Log({
            userId: req.user,
            brandName, 
            modelName, 
            mileage, 
            oilChanged, 
            brakesChecked, 
            lightsChecked, 
            anyDamages
        });

        const savedLog = await newLog.save();
        res.json(savedLog);
    }

    catch(err) {
        res.status(500).json({error: err.message});
    }
});

// @route       GET api/logs/all
// @desc        Get all logs associated with user
// @access      Private
router.get('/usersAll', auth, async (req, res) => {
    const logs = await Log.find({userId: req.user});
    res.json(logs);
});

// @route       GET api/logs/admin
// @desc        Get all logs from all users
// @access      Public
router.get('/adminAll', async (req, res) => {
    const logs = await Log.find();
    res.json(logs);
});



module.exports = router;