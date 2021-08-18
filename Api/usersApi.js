const express = require("express");
const router = express.Router();
const usersModels = require("../Models/usersModels");
const { response } = require("../base");
const { validationResult } = require('express-validator');
const validate = require("../Services/validator");

router.post("/login", validate.validateUser(), async (req, res) => {

    const errors = validationResult(req.body.body).formatWith(validate.formatErrors);
    if (!errors.isEmpty()) {
        res.json(response(false, errors.mapped()));
        return;
    }

    const data = new usersModels(
        req.body.body.username,
        req.body.body.password,
    );

    const getData = await data.login();
    if(getData.status){
        const checkData = data.verifyPassword(req.body.body.password, getData.data);
        if (checkData) {
            const token = data.createToken();
            res.json(response(true, { "username": data.username, "token": token }));
        } else {
            res.json(response(false, "PASSWORD_NOT_MATCH"));
        }
    }else{
        res.json(response(false, "USER_NOT_MATCH"));
    }
    
});

router.post("/register", validate.validateUser(), async (req, res) => {

    const errors = validationResult(req.body.body).formatWith(validate.formatErrors);
    if (!errors.isEmpty()) {
        res.status(422).json(response(false, errors.mapped()));
        return;
    }

    const data = new usersModels(
        req.body.body.username,
        req.body.body.password,
    );
    data.hashPassword();
    const newData = await data.store();
    res.json(newData);

});

module.exports = router;