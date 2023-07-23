const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');
const moment = require('moment');

// Create an appointment
router.post('/', async (req, res) => {
    console.log('received an appointment request...');
    const { user_id, doctor_id, slot } = req.body;

    // Validate user_id, doctor_id, and slot
    if (!user_id || typeof user_id !== 'string') {
        return res.status(400).json({ error: 'Invalid user_id.' });
    }
    if (!doctor_id || typeof doctor_id !== 'string') {
        return res.status(400).json({ error: 'Invalid doctor_id.' });
    }
    if (!slot || typeof slot !== 'string' || !moment(slot, moment.ISO_8601).isValid()) {
        return res.status(400).json({ error: 'Invalid slot.' });
    }

    // Convert the slot to a moment.js object for easier manipulation
    let slotMoment = moment(slot);

    // Check if the time is in the past
    if (slotMoment.isBefore(moment())) {
        return res.status(400).json({ error: 'Appointments cannot be booked in the past.' });
    }

    // Round down to the start of an hour
    slotMoment = slotMoment.startOf('hour');

    // Check if the time is within bookable hours
    if (slotMoment.hour() < 9 || slotMoment.hour() >= 17) {
        return res.status(400).json({ error: 'Appointments can only be booked from 9 AM to 5 PM.' });
    }

    // Convert moment back to a string for storing in the database
    const roundedSlot = slotMoment.format();

    const existingAppointment = await Appointment.findOne({ doctor_id, slot: roundedSlot });

    if(existingAppointment) {
        return res.status(400).json({ error: 'This timeslot is already taken.' });
    }

    const appointment = new Appointment({ user_id, doctor_id, slot: roundedSlot });

    try {
        await appointment.save();
        res.status(201).json(appointment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


module.exports = router;
