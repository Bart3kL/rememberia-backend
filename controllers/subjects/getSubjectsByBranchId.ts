import { Request, Response, NextFunction } from "express";

import Subjects from "../../models/subjects";

const getSubjectsByBranchId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const branchId = req.query.branchId;
    console.log(branchId);
    const subjects = await Subjects.find({ branchId });
    res.json(subjects);
  } catch (err) {
    return next(err);
  }
};

export default getSubjectsByBranchId;
