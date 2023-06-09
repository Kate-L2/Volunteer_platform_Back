import User from "../models/User.js";
import bcrypt from "bcrypt";
import tryCatch from "./utils/tryCatch.js";
// import { ROLES } from "../constants.js";
import generateJwt from "./utils/generateJwt.js";
import parseUser from "./utils/parseUser.js";

const register = tryCatch(async (req, res) => {
  const { firstName, lastName, email, role, password } = req.body;

  const existedUser = await User.findOne({ email: email });

  // if (password.length < 8) {
  //   return res.status(400).json({
  //     success: false,
  //     message: "Password`s length has to be more than 8",
  //   });
  // }

  //TODO: add more handlers

  if (existedUser) {
    return res
      .status(409)
      .json({
        success: false,
        message: "У вас вже є акаунт. Будь ласка перейдіть на сторінку логіну",
      });
  }

  // if (role !== ROLES.volunteer && role !== ROLES.organization) {
  //   return res.status(400).json({ success: false, message: "Неправильна роль" });
  // }

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
    .then((user) => {
      const userCopy = parseUser(user);

      // add token
      userCopy.token = generateJwt(userCopy);

      res.status(201).send({
        message: "Акаунт створено",
        result: userCopy,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({
        message: "Щось пішло не так під час створення акаунту",
        error,
      });
    });
});

export default register;
