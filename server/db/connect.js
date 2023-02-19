import mongoose from "mongoose";

const conn = mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => {
    console.log("Database Connected");
    return db;
  })
  .catch((err) => {
    console.log(err);
  });

export default conn;
