const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let database;

const mongoConnect = (callback) => {
  MongoClient.connect(
    // "mongodb+srv://Pavel:pokjdepokjde@cluster0.ozfhu.mongodb.net/<dbname>?retryWrites=true&w=majority"
    // "mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb"
    "mongodb://127.0.0.1:27017/movies"
  )
    .then((client) => {
      console.log("Connected!");
      database = client.db(); // here argument would overwrite default db name
      console.log("client.db: ", client.db());
      callback();
    })
    .catch((err) => {
      console.log("The error is: ", err);
      throw err;
    });
};

const getDb = async () => {
  if (database) {
    return database;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
