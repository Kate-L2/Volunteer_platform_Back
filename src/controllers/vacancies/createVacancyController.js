import User from "../../models/User.js";
import Vacancy from "../../models/Vacancy.js";
import tryCatch from "../utils/tryCatch.js";

const createVacancyController = tryCatch(async (req, res) => {
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
  } = req.body;

  const createEntity = {
    title,
    organizators,
    email,
    startDate,
    endDate,
    applicationDeadline,
    online,
    socials: JSON.parse(socials),
    img: {
      contentType: img.mimetype,
      data: img.buffer,
    },
    description,
    website,
    categories: JSON.parse(categories),
    // empty by default
    appliedApplications: [],
  };

  if (!online) {
    createEntity.city = JSON.parse(city);
    createEntity.address = address;
  }

  const newVacancy = await Vacancy.create(createEntity);

  newVacancy
    .save()
    .then((savedVacancy) => {
      const vacancyId = savedVacancy._id;

      User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { vacancies: vacancyId } },
        { new: true }
      )
        .populate({
          path: "vacancies",
          populate: [{ path: "city" }, { path: "categories" }],
        })
        .exec()
        .then((updatedUser) => {
          return res.status(200).send({
            message: "Вакансія створена успішно!",
            result: updatedUser.vacancies.find(
              (vacancy) => vacancy._id.toString() === vacancyId.toString()
            ),
          });
        })
        .catch((error) => {
          console.log(error);
          return res.status(400).send({
            message: "Вакансія не створена",
          });
        });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).send({
        message: "Вакансія не створена",
      });
    });
});

export default createVacancyController;
