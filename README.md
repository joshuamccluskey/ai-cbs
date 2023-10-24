# ai-cbs

## POC for Gen AI and MongoDB

### Updates

#### Proof of concept using Jesse Hall's guide. Using MongoDB, Dotenv, Axios, Hugging Face, and Atlas Search

- [Jesse Hall's Guide to Generative AI and MongoDB](https://www.mongodb.com/developer/products/atlas/building-generative-ai-applications-vector-search-open-source-models/)
- [Jesse Hall's Node Demo](https://www.youtube.com/watch?v=wOdZ1hEWvjU&t=466s)

- 10.23.23 Setup Node Integrated Mongodb+Dotenv and Connection to DB on Atlas
- ![Connection to MongoDB](/snapshots/Screenshot%202023-10-23%20at%208.23.54%20PM.png)
- 10.23.23 Interated Hugging Face Integrated Axios Embedding working
- ![Text Embedding](/snapshots/Screenshot%202023-10-23%20at%208.24.23%20PM.png)
- 10.23.23 Embedded documents in sample_mflix database
- ![Updated embedded collection](/snapshots/Screenshot%202023-10-23%20at%208.59.05%20PM.png)
- 10.23.23 Atlas Search Index Created with JSON Editor with the following configurations:
- ![Create Atlas Search Index with the following in JSON Editor](/snapshots/Screenshot%202023-10-23%20at%209.11.34%20PM.png)
- Final Result able to go further in meaning of plots to query movies tested many queries including the following: "Training day overcoming the hurdles of the minutae of life". Final results of Generative AI using Vector Search in MongoDB Atlas
-![Final results of Generative AI using Vector Search in MongoDB Atlas](/snapshots/Screenshot%202023-10-23%20at%209.54.44%20PM.png)