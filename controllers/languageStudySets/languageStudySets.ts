import { Request, Response, NextFunction } from "express";

import LanguageStudySet from "../../models/languageStudySet";

const languageStudySets = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const createdLanguageStudySet = new LanguageStudySet({
      language: "Angielski",
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

    await createdLanguageStudySet.save();
    res.status(201).json({ languageStudySets: createdLanguageStudySet });
  } catch (err) {
    return next(err);
  }
};

export default languageStudySets;
