const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const AppointmentSchema = new mongoose.Schema({
    _id: { type: String, default: uuidv4 },
    user_id: { type: String, required: true },
    doctor_id: { type: String, required: true },
    slot: { type: Date, required: true },
    notice_daily: { type: Boolean, default: false },
    notice_hourly: { type: Boolean, default: false },
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
