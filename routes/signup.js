const express = require("express");
const mongoQuery = require("../util/mongoQuery");

const router = express.Router();

const signupController = require("../controllers/signup");

router.post("/signup", signupController.userSignup);

router.get("/signup", (req, res, next) => {
  mongoQuery((client) => {
    const usersColl = client.db("movies").collection("users");
    usersColl
      .find()
      .toArray()
      .then((result) => {
        res.status(200).json(result);
      });
  });
});

module.exports = router;
