const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getNote, updateNote } = require("../controllers/noteController");

router.route("/date/:date").get(authMiddleware, getNote).post(authMiddleware, updateNote)

module.exports = router;
