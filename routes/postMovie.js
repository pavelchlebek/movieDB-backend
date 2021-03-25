const express = require("express");

const router = express.Router();

const postMovieController = require("../controllers/postMovie");

router.post("/post-movie", postMovieController.postMovie);

router.get("/movie-details/:movieId", postMovieController.getMovieDetail);

// getUserMOvies
router.get("/get-user-movies/:userId", postMovieController.getUserMovies);

module.exports = router;
