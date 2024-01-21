import mongoose from 'mongoose';

export const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

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

export const article = mongoose.model("articles", articleSchema);