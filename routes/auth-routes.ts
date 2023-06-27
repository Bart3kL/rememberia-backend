import express from "express";
import { check } from "express-validator";

import login from "../controllers/auth/login";
import signup from "../controllers/auth/signup";

const authRoutes = express.Router();

// userRoutes.get("/", usersController.getUsers);

authRoutes.post(
  "/signup",
  [
    check("name").isLength({ min: 3 }),
    check("email").isEmail(),
    check("password").isLength({ min: 8 }),
  ],
  signup
);

authRoutes.post("/login", login);

export default authRoutes;
