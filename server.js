import express from "express";
import logger from "morgan";
import mongoose from "mongoose";
import routes from "./controllers/index.js";
import cors from 'cors'
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors())
app.use(logger("dev"));
app.use(express.urlencoded({limit: '10000mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
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
