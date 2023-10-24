const { MongoClient } = require('mongodb');
const axios = require('axios');
require('dotenv').config();
const uri = process.env.MONGODB_CONNECTION_STRING;
const hfToken = process.env.HF_TOKEN;
const embeddingUrl = 'https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2';
const client = new MongoClient(uri);

async function genEmbed(text) {
    try {
        const response = await axios.post(
            embeddingUrl,
            {inputs: text},
            {headers: { Authorization: `Bearer ${hfToken}`}}
        );

        if (response.status != 200) {
            throw new Error(`Failed see status code ${response.status} : ${response.data}`);
        }

        return response.data;
    } catch (error) {
        console.error(error);
    }
};

//genEmbed('Hello World! MongoDB!');

async function main() {
    try {
        await client.connect();
        console.log("🍃 Pinged! Connected to MongoDB! 🍃");
        const db = client.db('sample_mflix');
        const collection = db.collection('movies');

        const docs = await collection.find({ 'plot': { '$exists': true}}).limit(100).toArray();

        for (let doc of docs) {
            doc.plot_embedding_hf = await genEmbed(doc.plot);
            await collection.replaceOne({'_id': doc._id}, doc);
            console.log(`🤙 Updated ${doc._id}`);
        };
        
        

    } finally {
        console.log("Connection closing ... 🛬");
        await client.close();
    }
};

main().catch(console.dir);