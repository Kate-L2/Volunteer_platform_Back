import Application from "../../models/Application.js";
import Vacancy from "../../models/Vacancy.js";
import tryCatch from "../utils/tryCatch.js";

const createApplicationController = tryCatch(async (req, res) => {
  const {
    fullName,
    dateOfBirth,
    email,
    experience,
    avatarId,
    about,
    phoneNumber,
    socials,
    city,
    categories,
    vacancyId,
  } = req.body;

  if (!vacancyId) {
    return res.status(400).json({ message: "Необхідно передати id вакансії" });
  }

  const userId = req.user._id;

  const newApplication = await Application.create({
    user: userId,
    fullName,
    dateOfBirth,
    email,
    experience,
    avatarId,
    about,
    phoneNumber,
    socials,
    city,
    categories,
  });

  const vacancy = await Vacancy.findById(vacancyId).populate(
    "appliedApplications"
  );
  if (!vacancy) {
    return res.status(400).json({ message: "Вакансія з таким id не знайдена" });
  }

  if (new Date().getTime() > new Date(vacancy.applicationDeadline).getTime()) {
    return res.status(400).json({
      message: "Дедлайн для подачі заявок для вакансії вже закінчився",
    });
  }

  if (
    vacancy.appliedApplications.find(
      (appliedApplication) =>
        appliedApplication.user.toString() === userId.toString()
    )
  ) {
    return res
      .status(400)
      .json({ message: "Заявка для цього резюме вже створенна" });
  }

  newApplication
    .save()
    .then((savedApplication) => {
      const applicationId = savedApplication?._id;

      if (!applicationId) {
        return res.status(400).json({ message: "Не вийшло зберігти заявку" });
      }

      Vacancy.findOneAndUpdate(
        { _id: vacancyId },
        { $push: { appliedApplications: savedApplication._id } },
        { new: true }
      )
        .populate({
          path: "appliedApplications",
          populate: [{ path: "city" }, { path: "categories" }],
        })
        .exec()
        .then((updatedVacancy) => {
          return res.status(200).send({
            message: "Заявка створена успішно!",
            result: updatedVacancy.appliedApplications.find(
              (appliedApplication) =>
                appliedApplication._id.toString() === applicationId.toString()
            ),
          });
        })
        .catch((error) => {
          console.log(error);
          return res.status(400).send({
            message: "Заявка не створена",
          });
        });
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).send({
        message: "Заявка не створена",
      });
    });
});

export default createApplicationController;
