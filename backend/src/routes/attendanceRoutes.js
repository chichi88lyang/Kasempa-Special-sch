// src/routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const { createAttendance, getAttendances } = require('../controllers/attendanceController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getAttendances)
  .post(protect, authorize('teacher','admin'), createAttendance);

module.exports = router;
