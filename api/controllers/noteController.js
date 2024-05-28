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

  // Since upsert, it will create it? 
  // if (!updatedNote) {
  //   
  // }

  res.status(200).json(updatedNote);
};

const getNote = async (req, res) => {
  const userId = req.user._id;
  const { date } = req.params;

  const note = await Note.findOne({ userId, date });

  if (!note) {
    // throw new NotFoundError("Note not found", {note, date});
  }

  res.status(200).json(note);
};

module.exports = {
  getNote,
  updateNote,
};
