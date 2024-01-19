import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { createUser, getUsers, updateUser, getUserById } from "../crud.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get("/", (req, res) => {
  const filePath = path.join(__dirname, "../public/index.html");
  res.sendFile(filePath);
});

router.get("/create-form", (req, res) => {
  const filePath = path.join(__dirname, "../public/form.html");
  res.sendFile(filePath);
});

router.get("/update-form", (req, res) => {
  const filePath = path.join(__dirname, "../public/update.html");
  res.sendFile(filePath);
});

router.get("/fetch", async (req, res) => {
  const userData = await getUsers();
  res.json(userData);
});

router.get("/fetchById/:_id", async (req, res) => {
  console.log(req.params._id);
  const userData = await getUserById(req.params._id);
  console.log(JSON.stringify(userData));
  res.json(userData);
});

// query request
// router.get("/fetchById", async (req, res) => {
//   console.log(req.query._id)
//   const userData = await getUserById(req.query._id);
//   res.json(userData);
// });

router.post("/submit", async ({ body }, res) => {
  try {
    console.log(body);
    const dbUser = await createUser(body);
    res.json(dbUser);
  } catch (err) {
    res.json(err);
  }
});

router.put("/update", async ({ body }, res) => {
  try {
    console.log(body);
    const updatedUser = await updateUser(body._id, body);
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
