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

async function queryEmbed (query) {
    try {
        await client.connect();
        console.log("🍃 Pinged! Connected to MongoDB! 🍃");
        const db = client.db('sample_mflix');
        const collection = db.collection('movies');

        results = await collection.aggregate([
            {
                $vectorSearch: {
                    index: "PlotSemanticsSearch",
                    "queryVector": await genEmbed(query),
                    "path": "plot_embedding_hf",
                    "numCandidates": 100,
                    "limit": 5,
                }
            },
            {
                $project: {
                    _id: 0,
                    title: 1,
                    plot:1,
                },
            }
        ]).toArray();

        console.log(results);
    } finally {
        console.log("Connection closing ... 🛬");
        await client.close();
    }
};

const query = "Training day overcoming the hurdles of the minutae of life";
queryEmbed(query).catch(console.dir);

// async function saveEmbed() {
//     try {
//         await client.connect();
//         console.log("🍃 Pinged! Connected to MongoDB! 🍃");
//         const db = client.db('sample_mflix');
//         const collection = db.collection('movies');

//         const docs = await collection.find({ 'plot': { '$exists': true}}).limit(100).toArray();

//         for (let doc of docs) {
//             doc.plot_embedding_hf = await genEmbed(doc.plot);
//             await collection.replaceOne({'_id': doc._id}, doc);
//             console.log(`🤙 Updated ${doc._id}`);
//         };
        
        

//     } finally {
//         console.log("Connection closing ... 🛬");
//         await client.close();
//     }
// };

// saveEmbed().catch(console.dir);

