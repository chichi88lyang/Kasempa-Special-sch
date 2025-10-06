import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Public
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected + role-based
router.get(
  "/admin-data",
  protect,
  authorizeRoles("Admin"),
  (req, res) => {
    res.json({ message: "Admin-only data" });
  }
);

router.get(
  "/teacher-data",
  protect,
  authorizeRoles("Teacher", "Admin"),
  (req, res) => {
    res.json({ message: "Teachers and Admins can see this" });
  }
);

router.get(
  "/student-data",
  protect,
  authorizeRoles("Student", "Teacher", "Admin"),
  (req, res) => {
    res.json({ message: "Students, Teachers, and Admins can see this" });
  }
);

export default router;
