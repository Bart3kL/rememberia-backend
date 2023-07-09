import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const axios = require("axios");

import User from "../../models/user";
import HttpError from "../../models/http-error";

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.body.googleAccessToken) {
    const { googleAccessToken } = req.body;

    axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
        },
      })
      .then(async (response: any) => {
        const email = response.data.email;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
          throw new HttpError(
            "User does not exist, please sign up instead",
            403
          );
        }

        const token = jwt.sign(
          { userId: existingUser?.id, email: existingUser?.email },
          "supersecret_dont_share",
          { expiresIn: "1h" }
        );

        res.json({
          userId: existingUser?.id,
          email: existingUser?.email,
          token: token,
        });
      })
      .catch((err: any) => {
        return next(err);
      });
  } else {
    const { email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email: email });

      if (
        !existingUser ||
        !(await bcrypt.compare(password, existingUser.password))
      ) {
        throw new HttpError("Invalid credentials, could not log you in.", 403);
      }

      const token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        "supersecret_dont_share",
        { expiresIn: "1h" }
      );

      res.json({
        userId: existingUser.id,
        email: existingUser.email,
        token: token,
      });
    } catch (err) {
      return next(err);
    }
  }
};

export default login;
