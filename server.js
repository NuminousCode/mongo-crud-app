// Imports necessary modules
import express from "express";
import logger from "morgan";
import mongoose from "mongoose";
import routes from "./controllers/index.js";
import cors from 'cors'
import path from "path";
import { fileURLToPath } from 'url';

// Converts the module URL to a file path and get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
const app = express();

// Middlewares 
app.use(cors())
app.use(logger("dev"));
app.use(express.urlencoded({limit: '10000mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Connects to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//JSON middleware
app.use(express.json({limit: '10000mb'}));

// Add routes defined in controllers
app.use(routes);

// Starts the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
