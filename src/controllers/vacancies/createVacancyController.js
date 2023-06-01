import Resume from "../../models/Resume.js";
import User from "../../models/User.js";
import Vacancy from "../../models/Vacancy.js";
import parseObj from "../utils/parseObj.js";
import tryCatch from "../utils/tryCatch.js";

const createVacancyController = tryCatch(async (req, res) => {
  const {
    title,
    organizators,
    email,
    startDate,
    endDate,
    applicationDeadline,
    online,
    address,
    img,
    description,
    website,
    categories,
    city,
  } = req.body;

  const newVacancy = await Vacancy.create({
    title,
    organizators,
    email,
    startDate,
    endDate,
    applicationDeadline,
    online,
    address,
    img,
    description,
    website,
    categories,
    city,
    // empty by default
    appliedApplications: [],
  });

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
