import { Request, Response, NextFunction } from "express";

import Subjects from "../../models/subjects";

const postSubject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const createdSubject = new Subjects({
      branchId: "programowanie",
      subjectTitle: "JavaScript",
      studySets: [
        {
          title: "Animals",
          author: "bar",
          words: [
            { word: "dog", translation: "pies" },
            { word: "horse", translation: "kon" },
          ],
        },
        {
          title: "House",
          author: "1",
          words: [
            { word: "kitchen", translation: "kuchnia" },
            { word: "fork", translation: "widelec" },
          ],
        },
      ],
    });

    await createdSubject.save();
    res.status(201).json({ subjects: createdSubject });
  } catch (err) {
    return next(err);
  }
};

export default postSubject;
