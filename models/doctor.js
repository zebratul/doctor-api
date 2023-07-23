const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const DoctorSchema = new mongoose.Schema({
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    spec: { type: String, required: true },
    slots: { type: [Date], required: true },
});

module.exports = mongoose.model('Doctor', DoctorSchema);
