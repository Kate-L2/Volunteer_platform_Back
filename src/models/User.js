import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  firstName: { type: String, min: 2, max: 15, required: true },
  lastName: { type: String, min: 2, max: 20, required: true },
  email: { type: String, min: 5, max: 50, required: true, unique: true },
  role: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("users", UserSchema);

export default User;
