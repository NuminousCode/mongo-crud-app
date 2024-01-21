import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { createUser, getUsers, updateUser, getUserById, deleteUser } from "../services/userServices.js";

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
  const userData = await getUsers();
  res.json(userData);
});

router.get("/fetchById/:_id", async (req, res) => {
  console.log(req.params._id);
  const userData = await getUserById(req.params._id);
  console.log(JSON.stringify(userData));
  res.json(userData);
});

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

router.delete("/delete/:_id", async (req, res) => {
  try {
    const _id = req.params._id;
    if (!_id) {
      return res.status(400).json({ error: "Missing user id" });
    }
    const deletedUser = await deleteUser(_id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User successfully deleted", user: deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


export default router;
