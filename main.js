const { MongoClient } = require('mongodb');
require('dotenv').config();
const uri = process.env.MONGODB_CONNECTION_STRING;

const client = new MongoClient(uri);

async function main() {
    try {
        await client.connect();
        await client.db("admin").command({ ping:1 });
        console.log("🍃 Pinged! Connected to MongoDB! 🍃");

    } finally {
        console.log("Connection closing ... 🛬");
        await client.close();
    }
};

main().catch(console.dir);