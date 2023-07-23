# Medical Appointment Booking API

## Introduction

This is a Node.js API built with Express and MongoDB for managing doctor appointments. It allows users to book an appointment with a doctor, within the doctor's available timeslots.

## Setup and Installation

1. Clone the repository and navigate to the project directory.
2. Install dependencies using `npm install`.
3. Run the API using 'npm run dev' command.

## API Endpoints

### POST /appointments

This endpoint allows you to create an appointment.

#### Request

Body parameters:
- `user_id`: The ID of the user who is booking the appointment. Must be a string.
- `doctor_id`: The ID of the doctor with whom the appointment is being booked. Must be a string.
- `slot`: The date and time of the appointment slot. Must be a string formatted as an ISO 8601 date and time.

Example:
```json
{
  "user_id": "6da7a89f-6b86-4810-ae71-0adc85adc13b",
  "doctor_id": "4a8d78f2-51c2-4862-85db-3d816c1c072a",
  "slot": "2023-07-24T10:00:00Z"
}
```

#### Response

If the appointment is created successfully, the API will return a 201 status code and the appointment object. If an error occurs, it will return a 400 status code and an error message.

Example of a successful response:
```json
{
  "_id": "60b5a2f5fde1404ecc85e6cf",
  "user_id": "6da7a89f-6b86-4810-ae71-0adc85adc13b",
  "doctor_id": "4a8d78f2-51c2-4862-85db-3d816c1c072a",
  "slot": "2023-07-24T10:00:00Z",
  "__v": 0
}
```

Example of an unsuccessful response:
```json
{
  "error": "Appointments can only be booked from 9 AM to 5 PM."
}
```

## Notes

- The time for the `slot` parameter is assumed to be in the local timezone of the server.
- The appointments can only be booked between 9 AM and 5 PM.
- The API will check if the slot is in the past or if it is already taken and will return an error message if either condition is met.


# Database Structure

The database consists of three collections: `Appointments`, `Doctors`, and `Users`.

## Appointments

Each document in the `Appointments` collection corresponds to a unique appointment. The structure of an appointment is as follows:

```json
{
  "_id": "<UUID>",
  "user_id": "<UUID referencing the User>",
  "doctor_id": "<UUID referencing the Doctor>",
  "slot": "<ISO 8601 Date and Time>",
  "notice_daily": "<Boolean>",
  "notice_hourly": "<Boolean>"
}
```

## Doctors

Each document in the Doctors collection corresponds to a unique doctor. The structure of a doctor is as follows:
```json
{
  "_id": "<UUID>",
  "name": "<String>",
  "spec": "<String>",
  "slots": "[<ISO 8601 Date and Time>, <ISO 8601 Date and Time>, ...]"
}
```

## Users

Each document in the Users collection corresponds to a unique user. The structure of a user is as follows:
```json
{
  "_id": "<UUID>",
  "phone": "<String>",
  "name": "<String>"
}
```


Please note that "<>" indicates that the value is a placeholder and should be replaced with actual data when using the schema.
