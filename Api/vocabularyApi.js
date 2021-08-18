const express = require("express");
const router = express.Router();
const { response } = require("../base");
const vocabularyModels = require("../Models/vocabularyModels");
const validate = require("../Services/validator");
const { validationResult } = require("express-validator");

router.get("/", async (req, res) => {
    const data = new vocabularyModels();
    res.json(await data.listTopic());
});

router.get("/:topic", async (req, res) => {
    const data = new vocabularyModels();
    res.json(await data.index(req.params.topic));
});

router.post("/store", validate.validateVocabulary(), async (req, res) => {

    const errors = validationResult(req).formatWith(validate.formatErrors);
    if (!errors.isEmpty()) {
        res.json(response(false, errors.mapped()));
        return;
    }

    const data = new vocabularyModels(
        req.body.body.vocabulary,
        req.body.body.means,
        res.user.body.username,
        req.body.body.topic,
    );

    const newData = await data.store();
    res.json(newData);

});

router.put("/update", async (req, res) => {

});

module.exports = router;