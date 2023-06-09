import tryCatch from "./utils/tryCatch.js";

const currentUser = tryCatch(async (req, res) => {
  return res.status(200).send({
    message: "Поточний користувач. Успіх",
    result: req.user,
  });
});

export default currentUser;
