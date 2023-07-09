import mongoose, { Schema, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

// interface User extends Document {
//   name: string;
//   email: string;
//   password: string;
// }

const languageStudySet = new Schema<any>({
  language: String,
  studySets: [
    {
      title: String,
      author: String,
      words: [{ word: String, translation: String }],
    },
  ],
});

languageStudySet.plugin(uniqueValidator);

const LanguageStudySet = mongoose.model<any>(
  "LanguageStudySets",
  languageStudySet
);

export default LanguageStudySet;
