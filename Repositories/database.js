const { MongoClient } = require("mongodb");
require('dotenv').config();

let db = {
    users: null,
    vocabulary: null,
}

const connectionMongo = () => {
    const mongoURL = process.env.MONGO_URL;
    const client = new MongoClient(mongoURL, {
        useNewUrlParser: true,
        useUniFiedTopology: true,
    })
    client.connect().then(() => {
        console.log("Connected to mongodb");
        const connectedDB = client.db("my-library");
        db.users = connectedDB.collection("users");
        db.vocabulary = connectedDB.collection("vocabulary");
    });
}

module.exports = { connectionMongo, db };