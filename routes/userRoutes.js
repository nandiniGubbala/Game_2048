const express = require("express");
const { createNewUser } = require("../controller/register");

const router = express.Router();

router.route('/').post(createNewUser);

module.exports = router;