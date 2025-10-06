import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 Auth
router.post("/register", registerUser);
router.post("/login", loginUser);

// 🔹 Role-based protected routes
router.get("/admin-data", protect, authorizeRoles("Admin"), (req, res) => {
  res.json({ message: "Welcome Admin, confidential data here 🚀" });
});

router.get("/teacher-data", protect, authorizeRoles("Teacher", "Admin"), (req, res) => {
  res.json({ message: "Welcome Teacher, class data loaded 📘" });
});

router.get("/student-data", protect, authorizeRoles("Student", "Teacher", "Admin"), (req, res) => {
  res.json({ message: "Welcome Student, here’s your progress 📊" });
});

export default router;
