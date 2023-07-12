import express from "express";
import {
  getProfile,
  login,
  logout,
  register,
} from "../controllers/userController.js";
import { isAuthentication } from "../middlewares/auth.js";

//
const router = express.Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Logout
router.get("/logout", logout);

// Profile
router.get("/profile", isAuthentication, getProfile);

//Export
export default router;
