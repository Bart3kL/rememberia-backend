import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../../models/user";
import HttpError from "../../models/http-error";

const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpError(
        "Invalid inputs passed, please check your data.",
        422
      );
    }

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      throw new HttpError("User exists already, please login instead.", 422);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const createdUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await createdUser.save();

    const token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "supersecret_dont_share",
      { expiresIn: "1h" }
    );

    res
      .status(201)
      .json({ userId: createdUser.id, email: createdUser.email, token: token });
  } catch (err) {
    return next(err);
  }
};

export default signup;
