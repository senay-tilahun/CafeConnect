import express from "express";

import { myDB } from "../db/MyDBAboutUs.js";

const router = express.Router();

router.post("/user-message", async (req, res) => {
  const userMessage = req.body;

  try {
    const result = await myDB.addUserMessage(userMessage);
    res.status(200).json({
      message: "User Message added successfully",
      userMessageId: result.insertedId,
    });
  } catch (error) {
    console.error("Error adding restaurant:", error);
    res.status(400).json({ error: "Error adding user message" });
  }
});

router.put("/user-message/:id", async (req, res) => {
  const id = req.params.id;
  const updatedUserMessage = req.body;

  try {
    const result = await myDB.updateUserMessage(id, updatedUserMessage);
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "User Message updated successfully" });
    } else {
      res.status(404).json({ error: "User Message not found" });
    }
  } catch (error) {
    console.error("Error updating user message:", error);
    res.status(400).json({ error: "Error updating user message" });
  }
});

router.get("/user-message/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await myDB.getUserMessage(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: "User Message not found" });
    }
  } catch (error) {
    console.error("Error getting user message:", error);
    res.status(400).json({ error: "Error getting user message" });
  }
});

router.delete("/user-message/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await myDB.deleteUserMessage(id);
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "User Message deleted successfully" });
    } else {
      res.status(404).json({ error: "User Message not found" });
    }
  } catch (error) {
    console.error("Error deleting user message:", error);
    res.status(400).json({ error: "Error deleting user message" });
  }
});

export default router;
