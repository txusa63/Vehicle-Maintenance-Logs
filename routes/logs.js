const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Log = require('../models/Log');

router.post('/', auth, async (req, res) => {
    try {
        const {brandName, modelName, modelYear, modelColor, mileage, oilChanged, brakesChecked, lightsChecked, anyDamages, extraInformation} = req.body;

        if(!brandName || !modelName || !mileage || !modelYear || !modelColor ) {
            return res.status(400).json({msg: 'Not all fields have been entered...'});
        }

        const newLog = new Log({
            userId: req.user,
            brandName, 
            modelName,
            modelYear,
            modelColor,
            mileage, 
            oilChanged, 
            brakesChecked, 
            lightsChecked, 
            anyDamages,
            extraInformation
        });

        const savedLog = await newLog.save();
        res.json(savedLog);
    }

    catch(err) {
        console.error(err);
        res.status(500).json({error: err.message});
    };
});


router.get('/employees', auth, async (req, res) => {
    const logs = await Log.find().sort({createdAt: 'desc'});
    res.json(logs);
});


router.get('/', auth, async (req, res) => {
    const {role} = req.body;
    const logs = await Log.find({userId: req.user}).sort({createdAt: 'desc'});
    res.json(logs);
});


router.get('/:id', auth, async (req, res) => {
    const log = await Log.findById(req.params.id);
    res.json(log);
});


router.put('/update/:id', auth, async (req, res) => {
    const {id} = req.params;
    const {brandName, modelName, modelYear, modelColor, mileage, oilChanged, brakesChecked, lightsChecked, anyDamages, extraInformation} = req.body;

    const updatedLog = {userId: req.user, _id: id, brandName, modelName, modelYear, modelColor, mileage, oilChanged, brakesChecked, lightsChecked, anyDamages, extraInformation};
    await Log.findByIdAndUpdate(id, updatedLog)
    res.json(updatedLog);
})

module.exports = router;