import express from "express";

import { myDB } from "../db/MyDB.js";

const router = express.Router();

router.get("/restaurants", async (req, res) => {
  console.log("Should return admin approved restaurants");
  const restaurants = await myDB.getRestaurants(req.query.amenities);

  res.json(restaurants);
});

router.put("/restaurants/:id", async (req, res) => {
  const restaurantId = req.params.id;
  const { updatedAmenities } = req.body;

  try {
    const result = await myDB.updateRestaurantAmenities(
      restaurantId,
      updatedAmenities
    );
    if (result) {
      res.status(200).json({ message: "Amenties updated successfully" });
    } else {
      res.status(404).json({ error: "Restaurant not found" });
    }
  } catch (error) {
    console.log("Error updating amenities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/add-restaurant", async (req, res) => {
  const newRestaurant = req.body;

  try {
    const result = await myDB.addNewRestaurant(newRestaurant);
    res.status(200).json({
      message: "Restaurant added successfully",
      restaurantId: result.insertedId,
    });
  } catch (error) {
    console.error("Error adding restaurant:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete-restaurant/:id", async (req, res) => {
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
