import mongoose from 'mongoose';

export const db = mongoose.connection;

//  Error event listener for the database connection
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Defines the schema for an 'article' document in MongoDB
const articleSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: {
    type: String,
    text: true 
  },
  imageUrl: String,
  category: String,
  date: Date,
  source: String,
  tags: Array
  });

  // Creates and exports a model from the schema
export const article = mongoose.model("articles", articleSchema);
