import express from "express";
import { check } from "express-validator";

const usersController = require("../controllers/users-controllers");

const userRoutes = express.Router();

userRoutes.get("/", usersController.getUsers);

userRoutes.post(
  "/signup",
  [
    check("name").isLength({ min: 3 }),
    check("email").isEmail(),
    check("password").isLength({ min: 8 }),
  ],
  usersController.signup
);

userRoutes.post("/login", usersController.login);

export default userRoutes;
