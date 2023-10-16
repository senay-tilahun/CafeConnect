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

  myDB.updateUserMessage = async (id, updatedMessage) => {
    const { client, db } = connect();
    const userMessagesCollection = db.collection("userMessages");

    try {
      const filter = { _id: new ObjectId(id) };
      const updateDoc = { $set: updatedMessage };
      const result = await userMessagesCollection.updateOne(filter, updateDoc);
      return result;
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  myDB.getUserMessage = async (id) => {
    const { client, db } = connect();
    const userMessagesCollection = db.collection("userMessages");

    try {
      const filter = { _id: new ObjectId(id) };
      const result = await userMessagesCollection.findOne(filter);
      return result;
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  myDB.deleteUserMessage = async (id) => {
    const { client, db } = connect();
    const userMessagesCollection = db.collection("userMessages");

    try {
      const filter = { _id: new ObjectId(id) };
      const result = await userMessagesCollection.deleteOne(filter);
      return result;
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  return myDB;
}

export const myDB = MyDB();
