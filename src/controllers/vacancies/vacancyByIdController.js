import Vacancy from "../../models/Vacancy.js";
import tryCatch from "../utils/tryCatch.js";

const vacancyByIdController = tryCatch(async (req, res) => {
  const vacancyId = req.params.id;

  Vacancy.findById(vacancyId)
    .populate("city")
    .populate("categories")
    // TODO
    // .populate("appliedApplications")
    .then((vacancy) => {
      if (!vacancy) {
        return res.status(404).send({
          message: "Вакансію не знайдено",
        });
      }

      return res.status(200).send({
        message: "Вакансію отримано. Успіх",
        result: vacancy,
      });
    })
    .catch((e) => {
      console.log(e);
      return res.status(404).send({
        message: "Вакансію не знайдено",
      });
    });
});

export default vacancyByIdController;
