const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// trying to serve images
const path = require("path");
app.use(express.static("public"));

/*---------------------------------------------------*/

const adminRoutes = require("./routes/admin");
const movieRoutes = require("./routes/movies");
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

app.use(adminRoutes);
app.use(movieRoutes);
app.use(signupRoutes);
app.use(signinRoutes);
app.use(addMovieRoutes);
app.use(postMovieRoutes);
app.use(paginationRoutes);

app.use((req, res, next) => {
  res.status(404).send("<h3>Page Not Found (404)</h3>");
  next();
});

// const server = http.createServer(app);
// server.listen(3000);

// or just
app.listen(8080);
