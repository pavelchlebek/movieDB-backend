const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const uri =
  "mongodb+srv://new-user:pokjde111@cluster0.ozfhu.mongodb.net/craigs?&retryWrites=true&w=majority";

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
