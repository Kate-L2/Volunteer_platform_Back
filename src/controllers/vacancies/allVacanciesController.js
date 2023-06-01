import Vacancy from "../../models/Vacancy.js";
import tryCatch from "../utils/tryCatch.js";

const allVacanciesController = tryCatch(async (req, res) => {
  const filters = {};

  // filters
  const currentVacanciesIds = req?.user?.vacancies;
  if (currentVacanciesIds) {
    filters._id = { $nin: currentVacanciesIds };
  }

  if (req.query?.city) {
    filters.city = req.query.city;
  }

  if (req.query?.categories) {
    filters.categories = { $in: req.query.categories.split(",") };
  }

  if (req.query?.search) {
    filters.nickName = { $regex: req.query.search, $options: "i" };
  }

  if (req.query?.startDate) {
    try {
      const startDate = new Date(req.query.startDate);
      filters.startDate = { $gte: startDate };
    } catch (e) {
      console.error(e);
    }
  }

  // find
  Vacancy.find(filters)
    .populate("city")
    .populate("categories")
    // TODO
    // .populate("appliedApplications")
    .then((vacancies) => {
      if (!vacancies || vacancies.length === 0) {
        return res.status(404).send({
          message: "Вакансії не знайдені",
          result: [],
        });
      }

      return res.status(200).send({
        message: "Вакансії отримані. Успіх",
        result: vacancies,
      });
    })
    .catch((e) => {
      console.log(e);
      return res.status(404).send({
        message: "Вакансії не знайдені",
        result: [],
      });
    });
});

export default allVacanciesController;
