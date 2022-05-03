const express = require("express");
const { searchShows, getShow } = require("../controllers/show");

const router = express.Router();

router.get("/show/search", searchShows);
router.get("/show", getShow);

module.exports = router;
