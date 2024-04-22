const Note = require("../models/Note");
const { NotFoundError } = require("../utils/error");

const updateNote = async (req, res) => {
  const userId = req.user._id;
  const { date } = req.params;
  const { note } = req.body;

  const updatedNote = await Note.findOneAndUpdate(
    { userId, date },
    { note },
    { upsert: true, new: true }
  );

  console.log(updatedNote);

  if (!updatedNote) {
    throw new Error("No note");
  }

  console.log(updatedNote);

  res.status(200).json(updatedNote);
};

const getNote = async (req, res) => {
  const userId = req.user._id;
  const { date } = req.params;

  const note = await Note.findOne({ userId, date });

  if (!note) {
    throw new NotFoundError("No note created yet");
  }

  console.log(note);

  res.status(200).json(note);
};

module.exports = {
  getNote,
  updateNote,
};
