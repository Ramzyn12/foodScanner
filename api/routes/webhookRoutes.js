const express = require("express");
const router = express.Router();
const { handleRcEvents } = require("../controllers/webhookController");


//  Limiter not needed for webhooks 
router.route("/").post(handleRcEvents);

module.exports = router;
