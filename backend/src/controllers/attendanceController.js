// src/controllers/attendanceController.js
const asyncHandler = require('express-async-handler');
const Attendance = require('../models/Attendance');

// Create attendance
const createAttendance = asyncHandler(async (req, res) => {
  const { pupilName, pupilRef, date, status, notes } = req.body;
  const att = await Attendance.create({ pupilName, pupilRef, date, status, notes });
  res.status(201).json(att);
});

// Get attendances
const getAttendances = asyncHandler(async (req, res) => {
  const list = await Attendance.find().sort({ date: -1 });
  res.json(list);
});

module.exports = { createAttendance, getAttendances };
