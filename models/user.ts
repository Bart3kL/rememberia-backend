import mongoose, { Schema, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

interface User extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false, minlength: 9 },
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model<User>("User", userSchema);

export default User;
