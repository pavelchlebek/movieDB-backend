const mongoQuery = require("../util/mongoQuery");

const ObjectId = require("mongodb").ObjectId;

exports.userAddMovie = (req, res, next) => {
  const movieId = req.body.movieId;
  const id = req.body.id;
  const o_id = new ObjectId(id);
  mongoQuery(async (client) => {
    const usersColl = client.db("craigs").collection("users");
    const user = await usersColl.findOne({ _id: o_id });
    const movies = user.movies;
    if (movies.includes(movieId)) {
      const newMovies = movies.filter((movie) => movie !== movieId);
      usersColl.updateOne({ _id: o_id }, { $set: { movies: newMovies } });
      res.status(200).json({ movies: newMovies });
    } else {
      const newMovies = [...movies, movieId];
      usersColl.updateOne({ _id: o_id }, { $set: { movies: newMovies } });
      res.status(200).json({ movies: newMovies });
    }
  });
  // this subsequent query was returning old (previous state) / old array of movies
  // mongoQuery(async (client) => {
  //   const usersColl = client.db().collection("users");
  //   const user = await usersColl.findOne({ _id: o_id });
  //   const myMovieIds = user.movies;
  //   const o_ids = myMovieIds.map((id) => new ObjectId(id));
  //   const moviesColl = client.db().collection("movies");
  //   const moviesObject = await moviesColl.find({ _id: { $in: o_ids } }).toArray();
  //   res.status(200).json({ myMovies: moviesObject });
  // });
};
