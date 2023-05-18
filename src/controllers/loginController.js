import User from "../models/User.js";
import bcrypt from "bcrypt";
import tryCatch from "./utils/tryCatch.js";
import generateJwt from "./utils/generateJwt.js";
import parseUser from "./utils/parseUser.js";

const login = tryCatch(async (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email })
    .then((user) => {
      if (!user.email) {
        res.status(404).send({
          message: "Цього користувача не існує",
        });
      }

      bcrypt.compare(password, user.password).then((passwordCheck) => {
        if (!passwordCheck) {
          return res.status(400).send({
            message: "Неправильний пароль",
          });
        }
        const userCopy = parseUser(user);
        const token = generateJwt(userCopy);

        res.status(200).send({
          message: "Ви успішно зайшли в свій акаунт",
          result: { ...userCopy, token },
        });
      });
    })
    .catch((e) => {
      res.status(400).send({
        message: "Не правильна пошта або пароль",
        e,
      });
    });
});

export default login;
