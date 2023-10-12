import { MongoClient } from "mongodb";

import { ObjectId } from "mongodb";

function MyDB() {
  const uri = "mongodb://localhost:27017";
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
    const pendingRestaurantsCollection = db.collection("pendingRestaurants");

    try {
      const result =
        await pendingRestaurantsCollection.insertOne(newRestaurant);
      return result;
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  myDB.addUserMessage = async (newMessage) => {
    const { client, db } = connect();
    const userMessagesCollection = db.collection("userMesseges");

    try {
      const result = await userMessagesCollection.insertOne(newMessage);
      return result;
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  return myDB;
}

export const myDB = MyDB();
