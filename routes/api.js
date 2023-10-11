import express from "express";

import { myDB } from "../db/MyDB.js";

const router = express.Router();

router.get("/restaurants", async (req, res) => {
  console.log("Should return admin approved restaurants");
  const restaurants = await myDB.getRestaurants(req.query.amenities);

  res.json(restaurants);
});

export default router;
