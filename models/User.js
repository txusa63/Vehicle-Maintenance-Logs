const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    passwordHash: {type: String, required: true, minlength: 5},
    displayName: {type: String},
    role: {type: String, required: true},
    gender: {type: String, required: true}
},{
    timestamps: true
}
);

const User = mongoose.model('User', userSchema);
module.exports = User;