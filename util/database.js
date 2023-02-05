const mongodb = require("mongodb");
const MOngodbClient = mongodb.MongoClient;
let _db;
const mongoConnect = (CallBack) => {
  MOngodbClient.connect(
    "mongodb+srv://lampro00:anhtapro11@cluster0.wrrut84.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      _db = client.db();
      CallBack();
    })
    .catch((err) => console.log(err));
};
const getDb = () => {
  if (_db) return _db;
  throw "no database";
};
module.exports.mongoConnect = mongoConnect;
module.exports.getDb = getDb;
