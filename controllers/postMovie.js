const mongoQuery = require("../util/mongoQuery");
const mongoTest = require("../util/testMongoQuery");

const ObjectId = require("mongodb").ObjectId;

/*--------------adding new movie to the database----------------------------*/

exports.postMovie = (req, res, next) => {
  const title = req.body.title;
  const year = req.body.year;
  const imageUrl = req.body.imageUrl;
  const genres = req.body.genres;
  const origin = req.body.origin;
  const length = req.body.length;
  const rating = req.body.rating;
  const direction = req.body.direction;
  const cast = req.body.cast;
  const description = req.body.description;
  mongoTest(async (client) => {
    const moviesColl = client.db().collection("editedMovies");
    moviesColl.insertOne({
      title: title,
      year: year,
      imageUrl: imageUrl,
      genres: genres,
      origin: origin,
      length: length,
      rating: rating,
      direction: direction,
      cast: cast,
      description: description,
    });
    res.status(201).json({ message: "Movie added!", title: title });
  });
};

/*----------------get user movies---XXXXXXXXXXXXXXXXXXXXXXX--------------- */

exports.getUserMovies = (req, res, next) => {
  const userId = req.params.userId;
  const o_id = new ObjectId(userId);
  mongoQuery(async (client) => {
    const usersColl = client.db("craigs").collection("users");
    const user = await usersColl.findOne({ _id: o_id });
    const myMovieIds = user.movies;
    const o_ids = myMovieIds.map((id) => new ObjectId(id));
    mongoTest(async (client) => {
      const moviesColl = client.db().collection("editedMovies");
      const moviesObject = await moviesColl.find({ _id: { $in: o_ids } }).toArray();
      res.status(200).json({ myMovies: moviesObject });
    });
  });
};

/*-----------------Connecting Detail Page--------------------*/

exports.getMovieDetail = (req, res, next) => {
  const movieId = req.params.movieId;
  const o_id = new ObjectId(movieId);
  mongoTest(async (client) => {
    const editedMoviesCollection = client.db().collection("editedMovies");
    const movie = await editedMoviesCollection.findOne({ _id: o_id });
    res.status(200).json(movie);
  });
};
