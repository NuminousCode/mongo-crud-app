// Imports necessary modules 
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { createArticle, getArticles, updateArticle, getArticleById, deleteArticle } from "../services/articleServices.js";

// Initializes the router object from Express 
const router = express.Router();

// Converts the module URL to a file path (__filename) and gets the directory name (__dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Defins routes to serve html files
router.get("/", (req, res) => {
  const filePath = path.join(__dirname, "../public/index.html");
  res.sendFile(filePath);
});

router.get("/create-form", (req, res) => {
  const filePath = path.join(__dirname, "../public/create.html");
  res.sendFile(filePath);
});

router.get("/update-form", (req, res) => {
  const filePath = path.join(__dirname, "../public/update.html");
  res.sendFile(filePath);
});
router.get("/delete-form", (req, res) => {
  const filePath = path.join(__dirname, "../public/delete.html");
  res.sendFile(filePath);
});

// Defines read, read by Id, create, update, and delete routes
router.get("/fetch", async (req, res) => {
  const articleData = await getArticles();
  res.json(articleData);
});

router.get("/fetchById/:_id", async (req, res) => {
  const articleData = await getArticleById(req.params._id);
  res.json(articleData);
});

router.post("/submit", async ({ body }, res) => {
  try {
  
    const dbArticle = await createArticle(body);
    res.json(dbArticle);
  } catch (err) {
    res.json(err);
  }
});

router.put("/update", async ({ body }, res) => {
  try {
    
    const updatedArticle = await updateArticle(body._id, body);
    res.json(updatedArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete/:_id", async (req, res) => {
  try {
    const _id = req.params._id;
    if (!_id) {
      return res.status(400).json({ error: "Missing article id" });
    }
    const deletedArticle = await deleteArticle(_id);
    if (!deletedArticle) {
      return res.status(404).json({ error: "article not found" });
    }
    res.json({ message: "Article successfully deleted", article: deletedArticle });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


export default router;
