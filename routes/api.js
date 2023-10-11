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
  // console.log("API - request body ... ", req.body);
  const updatedAmenities = req.body.updatedAmenities;
  // console.log("after API - request body ... ", req.body);

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

export default router;
