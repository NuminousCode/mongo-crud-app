// Imports the Article model from the articleModel file
import { article } from "../models/articleModel.js";

// CRUD functions defined
export async function getArticles() {
  try {
    return await article.find();
  } catch (error) {
    throw error;
  }
}

export async function getArticleById(_id) {
  try {
    return await article.findById(_id);
  } catch (error) {
    throw error;
  }
}

export async function createArticle(props) {
  try {
    const result = await article.create(props);
    return result;
  } catch (error) {
    console.log(error);
  } 
}

export async function deleteArticle(_id) {
  try {
    const result = await article.deleteOne({ _id });
    return result;
  } catch (error) {
    console.log(error);
    throw error; 
  } 
}


export async function updateArticle(_id, updateBody) {
  try {
    console.log(updateBody)
    const query = { _id: _id };
    const update = await article.findByIdAndUpdate(query, updateBody);
    return update;
  } catch (error) {
    console.log(error);
  } 
}

