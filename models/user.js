const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const UserSchema = new mongoose.Schema({
    _id: { type: String, default: uuidv4 },
    phone: { type: String, required: true },
    name: { type: String, required: true },
});

module.exports = mongoose.model('User', UserSchema);
