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
    modelYear: {
        type: String,
        required: true
    },
    modelColor: {
        type: String,
        required: true
    },
    mileage: {
        type: String,
        required: true
    },
    oilChanged: {
        type: Boolean,
        default: false
    },
    brakesChecked: {
        type: Boolean,
        default: false
    },
    lightsChecked: {
        type: Boolean,
        default: false
    },
    anyDamages: {
        type: Boolean,
        default: false
    },
    extraInformation: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = Log = mongoose.model('log', logSchema);