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

  //  Create API
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
