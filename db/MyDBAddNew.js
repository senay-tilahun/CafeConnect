import { MongoClient, ObjectId } from "mongodb";

function MyDB() {
  const uri = "mongodb://localhost:27017";
  const myDB = {};

  const connect = () => {
    const client = new MongoClient(uri);
    const db = client.db("CafeCompassRests");

    return { client, db };
  };

  // Create
  myDB.addNewPendRestaurant = async (newRestaurant) => {
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

  // Update
  myDB.updateRestaurant = async (id, updatedRestaurant) => {
    const { client, db } = await connect();
    const pendingRestaurantsCollection = db.collection("pendingRestaurants");

    try {
      const filter = { _id: new ObjectId(id) };
      const updateDoc = { $set: updatedRestaurant };
      const result = await pendingRestaurantsCollection.updateOne(
        filter,
        updateDoc
      );
      return result;
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  // Get
  myDB.getRestaurant = async (id) => {
    const { client, db } = await connect();
    const pendingRestaurantsCollection = db.collection("pendingRestaurants");

    try {
      const filter = { _id: new ObjectId(id) };
      const result = await pendingRestaurantsCollection.findOne(filter);
      return result;
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  // Delete
  myDB.deleteRestaurant = async (id) => {
    const { client, db } = await connect();
    const pendingRestaurantsCollection = db.collection("pendingRestaurants");

    try {
      const filter = { _id: new ObjectId(id) };
      const result = await pendingRestaurantsCollection.deleteOne(filter);
      return result;
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  return myDB;
}

export const myDB = MyDB();
