const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const uri = "mongodb://127.0.0.1:27017/movies";

const movieToStore = { name: "Seven", year: 1997, rating: 8.5 };

const mongoConnect = () => {
  MongoClient.connect(uri)
    .then(async (client) => {
      console.log("Connected to MongoDB");
      const database = client.db("movies");
      const collection = database.collection("movie");
      const result = await collection.insertOne({ movieToStore });
      console.log("insertedCount: ", result.insertedCount);
    })
    .catch((err) => {
      console.log("The error is: ", err);
    });
};

module.exports = mongoConnect;
