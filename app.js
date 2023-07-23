const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const appointmentRoutes = require('./routes/appointment');
const cron = require('node-cron');
const moment = require('moment');
const fs = require('fs');
const Appointment = require('./models/appointment');
const User = require('./models/user');
const Doctor = require('./models/doctor');
const cors = require('cors'); 

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:AutoAdminDB@cluster0.q8crrnk.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(cors()); 
app.use(bodyParser.json());

// Routes
app.use('/appointments', appointmentRoutes);

// Cron job to send reminders
cron.schedule('* * * * *', async function() {
    console.log('checking for appointments...');
    const appointments = await Appointment.find({});
    appointments.forEach(async function(appointment) {
        const { user_id, doctor_id, slot, notice_daily, notice_hourly } = appointment;
        const user = await User.findById(user_id);
        const doctor = await Doctor.findById(doctor_id);

        const now = moment();
        const apptTime = moment(slot);

        if (!notice_daily && apptTime.isSame(now.clone().add(1, 'days'), 'day')) {
            const log = `${now.format('MMMM Do YYYY, h:mm:ss a')} | Hello ${user.name}! This is a reminder that you have an appointment with ${doctor.spec} tomorrow at ${apptTime.format('MMMM Do YYYY, h:mm a')}!\n`;
            fs.appendFileSync('reminderLogs.txt', log);
            appointment.notice_daily = true;
            await appointment.save();
        } 
        if (!notice_hourly && apptTime.isSame(now.clone().add(2, 'hours'), 'hour')) {
            const log = `${now.format('MMMM Do YYYY, h:mm:ss a')} | Hello ${user.name}! You have an appointment in 2 hours with ${doctor.spec} at ${apptTime.format('MMMM Do YYYY, h:mm a')}!\n`;
            fs.appendFileSync('reminderLogs.txt', log);
            appointment.notice_hourly = true;
            await appointment.save();
        }
    });
});



app.listen(3000, () => console.log('Server started'));
