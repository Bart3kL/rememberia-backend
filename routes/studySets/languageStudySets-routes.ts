import express from "express";
import { check } from "express-validator";

import languageStudySets from "../../controllers/languageStudySets/languageStudySets";

const languageStudySetsRoutes = express.Router();

languageStudySetsRoutes.post("/languageStudy", languageStudySets);

// authRoutes.post("/login", login);

export default languageStudySetsRoutes;
