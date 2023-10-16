import express from "express";

import { myDB } from "../db/MyDBAddNew.js";

const router = express.Router();

router.post("/add-pending-restaurant", async (req, res) => {
  const restaurant = req.body;

  try {
    const result = await myDB.addNewPendRestaurant(restaurant);
    res.status(200).json({
      message: "Restaurant added successfully",
      userMessageId: result.insertedId,
    });
  } catch (error) {
    console.error("Error adding restaurant:", error);
    res.status(400).json({ error: "Error adding restaurant" });
  }
});

router.put("/update-pending-restaurant/:id", async (req, res) => {
  const id = req.params.id;
  const updatedRestaurant = req.body;

  try {
    const result = await myDB.updateRestaurant(id, updatedRestaurant);
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Restaurant updated successfully" });
    } else {
      res.status(404).json({ error: "Restaurant not found" });
    }
  } catch (error) {
    console.error("Error updating restaurant:", error);
    res.status(400).json({ error: "Error updating restaurant" });
  }
});

router.get("/get-pending-restaurant/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await myDB.getRestaurant(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: "Restaurant not found" });
    }
  } catch (error) {
    console.error("Error getting restaurant:", error);
    res.status(400).json({ error: "Error getting restaurant" });
  }
});

router.delete("/delete-pending-restaurant/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await myDB.deleteRestaurant(id);
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Restaurant deleted successfully" });
    } else {
      res.status(404).json({ error: "Restaurant not found" });
    }
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    res.status(400).json({ error: "Error deleting restaurant" });
  }
});

export default router;
