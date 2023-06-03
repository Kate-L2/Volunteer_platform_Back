import Application from "../../models/Application.js";
import tryCatch from "../utils/tryCatch.js";

const applicationByIdController = tryCatch(async (req, res) => {
  const applicationId = req.params.id;

  Application.findById(applicationId)
    .populate("city")
    .populate("categories")
    .then((application) => {
      if (!application) {
        return res.status(404).send({
          message: "Заявка не знайдена",
        });
      }

      return res.status(200).send({
        message: "Заявка отримана. Успіх",
        result: application,
      });
    })
    .catch((e) => {
      console.log(e);
      return res.status(404).send({
        message: "Заявка не знайдена",
      });
    });
});

export default applicationByIdController;
