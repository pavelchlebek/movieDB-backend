const express = require("express");

const router = express.Router();

const moviesPaginationController = require("../controllers/moviesPagination");

router.get("/movies-pagination/:page", moviesPaginationController.moviesPagination);

router.get(
  "/movies-settings/:page/:genre/:actor/:director/:origin",
  moviesPaginationController.moviesSettings
);

router.get("/get-actors", moviesPaginationController.getActors);

router.get("/get-directors", moviesPaginationController.getDirectors);

router.get("/get-origins", moviesPaginationController.getOrigins);

module.exports = router;
