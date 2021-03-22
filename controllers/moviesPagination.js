const mongoTest = require("../util/testMongoQuery");

exports.moviesPagination = (req, res, next) => {
  const page = req.params.page;
  console.log("page: ", page);
  mongoTest(async (client) => {
    const moviesPerPage = 10;
    const editedMoviesCollection = client.db().collection("editedMovies");
    const count = await editedMoviesCollection.countDocuments({});
    const result = await editedMoviesCollection
      .find()
      .skip((page - 1) * moviesPerPage)
      .limit(moviesPerPage)
      .toArray();
    res.status(200).json({ count, result });
  });
};

/*-------------- incorporating settings -----------------------------------------*/
exports.moviesSettings = (req, res, next) => {
  const page = req.params.page;
  const genre = req.params.genre;
  const actor = req.params.actor;
  const director = req.params.director;
  const origin = req.params.origin;
  mongoTest(async (client) => {
    const moviesPerPage = 10;
    const editedMoviesCollection = client.db().collection("editedMovies");
    if (
      genre === "undefined" &&
      actor === "undefined" &&
      director === "undefined" &&
      origin === "undefined"
    ) {
      const defaultCount = await editedMoviesCollection.countDocuments({});
      const defaultResult = await editedMoviesCollection
        .find({})
        .skip((page - 1) * moviesPerPage)
        .limit(moviesPerPage)
        .toArray();
      res.status(200).json({ count: defaultCount, result: defaultResult });
    } else {
      const count = await editedMoviesCollection.countDocuments({
        $or: [{ genres: genre }, { cast: actor }, { direction: director }, { origin: origin }],
      });
      const result = await editedMoviesCollection
        .find({
          $or: [{ genres: genre }, { cast: actor }, { direction: director }, { origin: origin }],
        })
        .skip((page - 1) * moviesPerPage)
        .limit(moviesPerPage)
        .toArray();
      res.status(200).json({ count, result });
    }
  });
};

/* ------------------end of settings-------------------------------------------- */

exports.getActors = (req, res, next) => {
  mongoTest(async (client) => {
    const actorColl = client.db().collection("actorCount");
    const actors = await actorColl
      .find()
      .project({ _id: 0, name: 1, inMovies: 1 })
      .sort({ inMovies: -1 })
      .limit(20)
      .toArray();
    actors.shift();
    finalActors = [];
    for (let i = 0; i < actors.length; i++) {
      finalActors.push(actors[i].name);
    }
    res.status(200).json(finalActors);
  });
};

exports.getDirectors = (req, res, next) => {
  mongoTest(async (client) => {
    const directorsColl = client.db().collection("directorsCount");
    const directors = await directorsColl
      .find()
      .project({ _id: 0, name: 1, inMovies: 1 })
      .sort({ inMovies: -1 })
      .limit(20)
      .toArray();
    finalDirectors = [];
    for (let i = 0; i < directors.length; i++) {
      finalDirectors.push(directors[i].name);
    }
    res.status(200).json(finalDirectors);
  });
};

exports.getOrigins = (req, res, next) => {
  mongoTest(async (client) => {
    const originsColl = client.db().collection("originCount");
    const origins = await originsColl
      .find()
      .project({ _id: 0, name: 1, inMovies: 1 })
      .sort({ inMovies: -1 })
      .limit(20)
      .toArray();
    finalOrigins = [];
    for (let i = 0; i < origins.length; i++) {
      finalOrigins.push(origins[i].name);
    }
    res.status(200).json(finalOrigins);
  });
};
