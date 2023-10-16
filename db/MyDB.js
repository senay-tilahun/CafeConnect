import "dotenv/config"; // to load .env file

import { MongoClient, ObjectId } from "mongodb";

function MyDB() {
  const uri = process.env.MONGO_URL || "mongodb://localhost:27017";
  const myDB = {};

  const connect = () => {
    const client = new MongoClient(uri);
    const db = client.db("CafeCompassRests");

    return { client, db };
  };

  myDB.getRestaurants = async (amenities) => {
    let query = {};
    if (amenities?.length) {
      amenities = amenities.split(",");
      query = {
        $and: amenities.map((am) => {
          const result = {};
          result[`Amenities.${am}`] = { $gt: 0 };
          return result;
        }),
      };
    }

    const { client, db } = connect();
    const restaurantsCollection = db.collection("approvedRestaurants");

    try {
      return await restaurantsCollection.find(query).limit(20).toArray();
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  myDB.updateRestaurantAmenities = async (restaurantId, updatedAmenities) => {
    const { client, db } = connect();
    const restaurantsCollection = db.collection("approvedRestaurants");

    try {
      const filter = { _id: new ObjectId(restaurantId) };
      const update = {
        $inc: updatedAmenities.reduce((acc, amenity) => {
          return { ...acc, [`Amenities.${amenity}`]: 1 };
        }, {}),
      };

      const result = await restaurantsCollection.updateOne(filter, update);

      return result.matchedCount > 0;
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  myDB.addNewRestaurant = async (newRestaurant) => {
    const { client, db } = connect();
    const restaurantsCollection = db.collection("approvedRestaurants");

    try {
      const result = await restaurantsCollection.insertOne(newRestaurant);
      return result;
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  // Delete
  myDB.deleteRestaurant = async (id) => {
    const { client, db } = await connect();
    const restaurantsCollection = db.collection("approvedRestaurants");

    try {
      const filter = { _id: new ObjectId(id) };
      const result = await restaurantsCollection.deleteOne(filter);
      return result;
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  return myDB;
}

export const myDB = MyDB();
