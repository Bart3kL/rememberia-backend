import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
const cors = require("cors");

import authRoutes from "./routes/auth/routes";
import subjectRoutes from "./routes/subjects/routes";

const app = express();

app.use(cors(["http://localhost:3000"]));

dotenv.config();

const mongoDBUrl = process.env.MONGODB_URL;
const port = process.env.PORT;

app.use(bodyParser.json());

app.use(function (req: Request, res: Response, next: NextFunction) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/users", authRoutes);
app.use("/api/", subjectRoutes);

app.use(function (error: any, req: Request, res: Response, next: NextFunction) {
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(mongoDBUrl!)
  .then(function () {
    app.listen(port, function () {
      console.log("Server is running on port " + port);
    });
  })
  .catch(function (err: Error) {
    console.log(err);
  });
