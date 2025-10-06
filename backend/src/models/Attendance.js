// src/models/Attendance.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  pupilName: { type: String, required: true },
  pupilRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // adjust if you create a separate Pupil model
  date: { type: Date, required: true },
  status: { type: String, enum: ['present','absent','late'], default: 'present' },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
