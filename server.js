import express from "express";
import logger from "morgan";
import mongoose from "mongoose";
import routes from "./controllers/index.js";
import cors from 'cors'

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors())
app.use(logger("dev"));

//use qs library to parse http requests containing html form data
app.use(express.urlencoded({limit: '10000mb', extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(express.json({limit: '10000mb'}));
app.use(routes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
