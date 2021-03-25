const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// serving ststic images
app.use(express.static("public"));

/*---------------------------------------------------*/

const signupRoutes = require("./routes/signup");
const signinRoutes = require("./routes/signin");
const addMovieRoutes = require("./routes/addMovie");
const postMovieRoutes = require("./routes/postMovie");
const paginationRoutes = require("./routes/moviesPagination");

// app.use(bodyParser.urlencoded({ extended: false })); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(signupRoutes);
app.use(signinRoutes);
app.use(addMovieRoutes);
app.use(postMovieRoutes);
app.use(paginationRoutes);

app.use((req, res, next) => {
  res.status(404).send("<h3>Page Not Found (404)</h3>");
  next();
});

app.listen(8080);
