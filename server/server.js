import express from "express";
import cors from "cors";
import router from "./routes/route.js";
import dotenv from "dotenv";
dotenv.config();

const conn = import("./db/connect.js");

const app = express();

const port = process.env.PORT;
//use middleware
app.use(cors());
app.use(express.json());
//using routes
app.use("/", router);

conn
  .then((db) => {
    if (!db) return process.exit(1);

    app.listen(port, () => {
      console.log(`Server is running on a port:${port}`);
    });
    app.on("error", (err) =>
      console.log(`Failed to Connect with HTTP server:${err}`)
    );
  })
  .catch((error) => {
    console.log(`Connection Failed   ${error}`);
  });
