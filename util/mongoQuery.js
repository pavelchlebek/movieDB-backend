const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const uri = "mongodb://127.0.0.1:27017/movies";

const mongoQuery = (callback) => {
  MongoClient.connect(uri)
    .then((client) => {
      console.log("Connected!");
      callback(client);
    })
    .catch((err) => {
      console.log("The error is: ", err);
      throw err;
    });
};

module.exports = mongoQuery;
