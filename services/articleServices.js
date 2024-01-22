// Imports the Article model from the articleModel file
import { Article } from "../models/articleModel.js";

// CRUD functions defined
export async function getArticles() {
  try {
    return await Article.find();
  } catch (error) {
    throw error;
  }
}

export async function getArticleById(_id) {
  try {
    return await Article.findById(_id);
  } catch (error) {
    throw error;
  }
}

export async function createArticle(props) {
  try {
    const result = await Article.create(props);
    return result;
  } catch (error) {
    console.log(error);
  } 
}

export async function deleteArticle(_id) {
  try {
    const result = await Article.deleteOne({ _id });
    return result;
  } catch (error) {
    console.log(error);
    throw error; 
  } 
}


export async function updateArticle(_id, updateBody) {
  try {
    const query = { _id: _id };
    const update = await Article.findByIdAndUpdate(query, updateBody);
    return update;
  } catch (error) {
    console.log(error);
  } 
}

