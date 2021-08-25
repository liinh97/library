const express = require("express");
const router = express.Router();
const usersModels = require("../Models/usersModels");
const { response } = require("../base");
const { validationResult } = require('express-validator');
const validate = require("../Services/validator");

router.post("/login", validate.validateUser(), async (req, res) => {

    try {

        const errors = validationResult(req).formatWith(validate.formatErrors);
        if (!errors.isEmpty()) {
            res.json(response(false, errors.array()[0]));
        }else{
            const data = new usersModels(
                req.body.username,
                req.body.password,
            );
    
            const getData = await data.login();
            if (getData.status) {
                const checkData = data.verifyPassword(req.body.password, getData.data);
                if (checkData) {
                    const token = data.createToken();
                    res.json(response(true, { "username": data.username, "token": token }));
                } else {
                    res.json(response(false, "Password not found, check again ^_^"));
                }
            } else {
                res.json(response(false, "Username not found, check again >.<"));
            }
        }

    } catch (err) { }

});

router.post("/register", validate.validateUser(), async (req, res) => {

    try {

        const errors = validationResult(req).formatWith(validate.formatErrors);
        if (!errors.isEmpty()) {
            res.json(response(false, errors.array()[0]));
        }else{
            const data = new usersModels(
                req.body.username,
                req.body.password,
            );
            data.hashPassword();
            const newData = await data.store();
            res.json(newData);
        }
    } catch (err) { }

});

module.exports = router;