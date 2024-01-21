import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { createArticle, getArticles, updateArticle, getArticleById, deleteArticle } from "../services/articleServices.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

router.get("/fetch", async (req, res) => {
  const articleData = await getArticles();
  res.json(articleData);
});

router.get("/fetchById/:_id", async (req, res) => {
  console.log(req.params._id);
  const articleData = await getArticleById(req.params._id);
  console.log(JSON.stringify(articleData));
  res.json(articleData);
});

router.post("/submit", async ({ body }, res) => {
  try {
    console.log(body);
    const dbArticle = await createArticle(body);
    res.json(dbArticle);
  } catch (err) {
    res.json(err);
  }
});

router.put("/update", async ({ body }, res) => {
  try {
    console.log(body);
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
