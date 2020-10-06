const mongoose = require('mongoose');
const logSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    brandName: {
        type: String,
        required: true
    },
    modelName: {
        type: String,
        required: true
    },
    mileage: {
        type: String,
        required: true
    },
    oilChanged: {
        type: String,
        required: true
    },
    brakesChecked: {
        type: String,
        required: true
    },
    lightsChecked: {
        type: String,
        required: true
    },
    anyDamages: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Log = mongoose.model('log', logSchema);