import tryCatch from "./utils/tryCatch.js";
import parseObj from "./utils/parseObj.js";
import Category from "../models/Category.js";

const caterories = tryCatch(async (req, res) => {
  Category.find()
    .then((categories) => {
      const categoriesCopy = parseObj(categories);
      res.status(200).send({
        message: "Успіх з категоріями",
        result: categoriesCopy,
      });
    })
    .catch(() => {
      res.status(400).send({
        message: "Помилка в категоріях",
      });
    });
});

export default caterories;
