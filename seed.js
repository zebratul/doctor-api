const mongoose = require('mongoose');
const User = require('./models/user');
const Doctor = require('./models/doctor');
const Appointment = require('./models/appointment');
const moment = require('moment');

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:AutoAdminDB@cluster0.q8crrnk.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Populate Users
// const users = [
//     { phone: '+7 926 578 85 14', name: 'Ivan' },
//     { phone: '+7 926 578 85 15', name: 'Katya' },
//     { phone: '+7 926 578 85 16', name: 'Roman' }
// ];

// users.forEach(async (user) => {
//     const newUser = new User(user);
//     await newUser.save();
// });

// Populate Doctors

const doctors = [
    { name: 'Samir', spec: 'Therapist' },
    { name: 'Ahmed', spec: 'Cardiologist' },
    { name: 'David', spec: 'Neurologist' }
];

doctors.forEach(async (doctor) => {
    // Generate 8 slots and store them in doctor's slots array
    doctor.slots = Array(8).fill().map((_, i) => {
        // Each slot is 1 hour apart
        // Create a new moment object for each slot
        let slotStart = moment().set({ hour: 9, minute: 0, second: 0, millisecond: 0 });
        return new Date(slotStart.add(i, 'hours').toISOString());
    });

    const newDoctor = new Doctor(doctor);
    await newDoctor.save();
});


// // Populate Appointments
// const appointments = [
//     { user_id: '6da7a89f-6b86-4810-ae71-0adc85adc13b', doctor_id: '4a8d78f2-51c2-4862-85db-3d816c1c072a', slot: new Date() },
//     { user_id: '9fef66bd-e5b8-4dde-afdc-204969143128', doctor_id: '58f78dfe-2b73-49f6-a7c9-c0dc3b03f50a', slot: new Date() },
//     { user_id: '0038b4d0-5017-465e-8f10-bafb3f7bedd3', doctor_id: '26b26b3c-3892-456f-a32f-dd0ed440b799', slot: new Date() }
// ];


// appointments.forEach(async (appointment) => {
//     const newAppointment = new Appointment(appointment);
//     await newAppointment.save();
// });

console.log('Database seeded!');
