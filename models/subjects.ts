import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const subjects = new Schema<any>({
  branchId: String,
  subjectTitle: String,
  studySets: [
    {
      title: String,
      author: String,
      words: [{ word: String, translation: String }],
    },
  ],
});

subjects.plugin(uniqueValidator);

const Subjects = mongoose.model<any>("Subjects", subjects);

export default Subjects;
