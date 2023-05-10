import express from "express";

const myResumeRouter = express.Router();

myResumeRouter
  .route("/")
  // .get(notesController.getAllNotes)
  // .post(notesController.createNewNote)
  // .patch(notesController.updateNote)
  // .delete(notesController.deleteNote);

export default myResumeRouter;
