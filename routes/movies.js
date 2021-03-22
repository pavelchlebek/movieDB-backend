const express = require("express");
const mongoQuery = require("../util/mongoQuery");

const router = express.Router();

router.get("/", (req, res, next) => {
  mongoQuery((client) => {
    const coll = client.db("movies").collection("movie");
    coll
      .find()
      .toArray()
      .then((result) => {
        res.status(200).json(result);
      });
  });
});

module.exports = router;
