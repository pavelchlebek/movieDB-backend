const express = require("express");

const router = express.Router();

const postMovieController = require("../controllers/postMovie");

router.post("/post-movie", postMovieController.postMovie);

router.get("/movies", postMovieController.getMovies);

router.get("/get-my-movies/:userId", postMovieController.getMyMovies);

router.get("/movie/:movieId", postMovieController.getMovie);

// test editedMovies
router.get("/get-edited-movies", postMovieController.getEditedMovies);

// connecting editedMovies with detail

router.get("/movie-details/:movieId", postMovieController.getMovieDetail);

// getUserMOvies
router.get("/get-user-movies/:userId", postMovieController.getUserMovies);

module.exports = router;
