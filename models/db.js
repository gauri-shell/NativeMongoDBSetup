const { MongoClient } = require("mongodb");

const uri = `mongodb://userg:hello123@cluster0-shard-00-00.5rm6t.mongodb.net:27017,cluster0-shard-00-01.5rm6t.mongodb.net:27017,cluster0-shard-00-02.5rm6t.mongodb.net:27017/testdb?replicaSet=atlas-bsqozi-shard-0&ssl=true&authSource=admin`;

let db;

async function connectDB() {
  try {
    const client = new MongoClient(uri); // Simplified connection, no deprecated options needed
    await client.connect();
    db = client.db(); // Automatically connects to the specified database
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  }
}

function getDB() {
  if (!db) throw new Error("Database not initialized. Call connectDB first.");
  return db;
}
module.exports = { connectDB, getDB };











// const { MongoClient } = require('mongodb');

// const uri = 'mongodb+srv://username:password@cluster0.mongodb.net/mydb';

// async function connectDB() {
//   try {
//     const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//     await client.connect();
//     console.log("MongoDB connected");
//     return client.db();
//   } catch (err) {
//     console.error("MongoDB connection error:", err);
//     process.exit(1);
//   }
// }

// module.exports = connectDB;









