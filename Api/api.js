const express = require("express");
const router = express.Router();
const usersApi = require("./usersApi");
const vocabularyApi = require("./vocabularyApi");
const { authentication } = require("../Middleware/authentication");

// router.use("/", usersApi);

// // Middleware User With Login Token
// router.use(authentication);
// router.use("/vocabulary", vocabularyApi);

module.exports = router;