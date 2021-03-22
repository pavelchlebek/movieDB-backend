const express = require("express");
const mongoQuery = require("../util/mongoQuery");

const router = express.Router();

// const movieToStore = { name: "Population 436", year: 2003, rating: 8.1 };

const titleToStore = { name: "I am learning MongoDB drivers" };

router.get("/add-product", (req, res, next) => {
  res.send(
    '<form action="/product" method="POST" ><input type="text" name="title" /><button type="submit">Add Product</button></form>'
  );
});

router.post("/product", (req, res, next) => {
  mongoQuery((client) => {
    const db = client.db("movies");
    const coll = db.collection("titles");
    coll.insertOne({ name: req.body.title }).then((result) => {
      console.log("insertedCount: ", result.insertedCount);
    });
  });
  console.log("Req.body: ", req.body.title);

  res.redirect("/");
});

module.exports = router;
