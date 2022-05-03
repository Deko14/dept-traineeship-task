const express = require("express");
const { searchMovies, getMovie } = require("../controllers/movie");

const router = express.Router();

router.get("/movie/search", searchMovies);
router.get("/movie", getMovie);

module.exports = router;
