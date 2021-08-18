const express = require("express");
const router = express.Router();
const usersApi = require("./usersApi");
const vocabularyApi = require("./vocabularyApi");
const { authentication } = require("../Middleware/authentication");
const { db } = require("../Repositories/database");

router.use("/user", usersApi);

// Middleware User With Login Token
// router.use(authentication);
router.use("/vocabulary", vocabularyApi);

router.get("/test", async (req, res) => {
    const data = await db.vocabulary.findOne({ topic: "Animals" });
    console.log(data);
    res.json(data);
});

module.exports = router;