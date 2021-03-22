const express = require("express");

const router = express.Router();

const addMovieController = require("../controllers/addMovie");

router.post("/add-movie", addMovieController.userAddMovie);

module.exports = router;
