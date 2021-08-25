const http = require("http");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const router = require("./Api/api");
const { connectionMongo } = require("./Repositories/database");
const server = http.createServer(app);

connectionMongo();
app.use(cors());
app.use(bodyParser());
app.use(router);

// server.listen("8080", err => {
//     err ?? console.log("Server is running at http://localhost:8080");
// });


server.listen(process.env.PORT || 8080, (err) => {
    err ?? console.log("Server running");
});