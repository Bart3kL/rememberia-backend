import express from "express";
// import { check } from "express-validator";

import postSubject from "../../controllers/subjects/postSubject";
import getSubjectsByBranchId from "../../controllers/subjects/getSubjectsByBranchId";

const subjectRoutes = express.Router();

subjectRoutes.post("/subjects", postSubject);

subjectRoutes.get("/subjects", getSubjectsByBranchId);

export default subjectRoutes;
