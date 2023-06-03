import Vacancy from "../../models/Vacancy.js";
import tryCatch from "../utils/tryCatch.js";

const editVacancyController = tryCatch(async (req, res) => {
  if (!req.user?.vacancies) {
    return res.status(404).send({
      message: "Вакансії не знайдено",
    });
  }
  const img = req.file;

  const {
    title,
    organizators,
    email,
    startDate,
    endDate,
    applicationDeadline,
    online,
    address,
    description,
    website,
    categories,
    city,
    socials,
    id: vacancyId,
  } = req.body;

  if (!vacancyId) {
    return res.status(400).json({ message: "Необхідно передати id вакансії" });
  }

  // check user's vacancies
  if (
    !req.user?.vacancies.find(
      (vacancy) => vacancy.toString() === vacancyId.toString()
    )
  ) {
    return res
      .status(403)
      .json({ message: "Недостатньо прав для редагування" });
  }

  const editEntity = {
    title,
    organizators,
    email,
    startDate,
    endDate,
    applicationDeadline,
    online,
    socials: JSON.parse(socials),
    img: img
      ? {
          contentType: img.mimetype,
          data: img.buffer,
        }
      : undefined,
    description,
    website,
    categories: JSON.parse(categories),
    appliedApplications: [],
  };

  if (!online) {
    editEntity.city = JSON.parse(city);
    editEntity.address = address;
  } else {
    delete editEntity.city;
    editEntity.address;
  }

  await Vacancy.findOneAndUpdate({ _id: vacancyId }, editEntity, {
    new: true,
  })
    .populate("city")
    .populate("categories")
    .then((updatedVacancy) => {
      if (!updatedVacancy) {
        return res.status(400).send({
          message: "Оновлена вакансія не знайдена",
        });
      }

      return res.status(200).send({
        message: "Вакансія оновлена успішно!",
        result: updatedVacancy,
      });
    })
    .catch((e) => {
      console.log(e);
      return res.status(400).send({
        message: "Помилка в оновленні вакансії",
      });
    });
});

export default editVacancyController;
