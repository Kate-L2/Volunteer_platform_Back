import Vacancy from "../../models/Vacancy.js";
import tryCatch from "../utils/tryCatch.js";

const vacanciesController = tryCatch(async (req, res) => {
  if (req?.user?.vacancies) {
    const vacancies = await Vacancy.find({ _id: { $in: req.user.vacancies } })
      .populate("city")
      .populate("categories");
    // TODO
    // .populate("appliedApplications");

    if (!vacancies || vacancies.length === 0) {
      return res.status(404).send({
        message: "Вакансії не знайдено",
      });
    }

    return res.status(200).send({
      message: "Мої вакансії. Успіх",
      result: vacancies,
    });
  } else {
    return res.status(404).send({
      message: "Вакансії не знайдено",
    });
  }
});

export default vacanciesController;
