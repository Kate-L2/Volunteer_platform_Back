import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  firstName: { type: String, min: 3, max: 20, required: true },
  lastName: { type: String, min: 3, max: 20, required: true },
  email: { type: String, min: 5, max: 50, required: true, unique: true },
  role: { type: String, required: true },
  password: { type: String, min: 8, max: 30, required: true },
  resume: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "resumes",
  },
  vacancies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vacancies",
    },
  ],
});

const User = mongoose.model("users", UserSchema);

export default User;
