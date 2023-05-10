import User from "../models/User.js";
import bcrypt from "bcrypt";
import tryCatch from "./utils/tryCatch.js";

const register = tryCatch(async (req, res) => {
  const { firstName, lastName, email, role, password } = req.body;

  const existedUser = await User.findOne({ email: email });

  // if (password.length < 8) {
  //   return res.status(400).json({
  //     success: false,
  //     message: "Password`s length has to be more than 8",
  //   });
  // }

  if (existedUser) {
    return res
      .status(409)
      .json({ success: false, message: "You already have an account" });
  }

  const hashPassword = await bcrypt.hash(password, 12);

  const newUser = await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    role: role,
    password: hashPassword,
  });

  newUser
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).send({
        message: "User Created Successfully",
        result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({
        message: "Something went wrong during an user creation",
        error,
      });
    });
});

export default register;
