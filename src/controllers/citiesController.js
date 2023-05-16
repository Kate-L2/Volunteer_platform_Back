import tryCatch from "./utils/tryCatch.js";
import parseObj from "./utils/parseObj.js";
import City from "../models/City.js";

const cities = tryCatch(async (req, res) => {
  City.find()
    .then((cities) => {
      const citiesCopy = parseObj(cities);
      res.status(200).send({
        message: "Cities successful",
        result: citiesCopy,
      });
    })
    .catch(() => {
      res.status(400).send({
        message: "Cities error",
      });
    });
});

export default cities;
