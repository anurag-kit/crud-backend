import mongoose from "mongoose";

function dbConnection() {
  const DB_NAME = "qxp-weekend-todo";
  const MONGO_DB_URL =
    "mongodb+srv://anuragguptakit_db_user:M7Mtp2QOOKbV6AR9@first-cloud-db.ec5cboy.mongodb.net/";
  const connection = mongoose.connect(`${MONGO_DB_URL}${DB_NAME}`);
  connection
    .then((db) => {
      console.log("db connected", db.connection._connectionString);
    })
    .catch((err) => {
      console.log("error", err);
    });
}
export default dbConnection