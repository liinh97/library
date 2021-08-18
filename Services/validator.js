const { check } = require("express-validator");

const validateUser = () => {

    return [
        check("username", "does not empty").not().isEmpty(),
        check("username", "more than 1 degits").isLength({ min: 1 }),
        check("password", "does not empty").not().isEmpty(),
        check("password", "more than 1 degits").isLength({ min: 1 })
    ];

}

const validateVocabulary = () => {

    return [
        check("vocabulary", "does not empty").not().isEmpty(),
        check("vocabulary", "more than 1 degits").isLength({ min: 1 }),
        check("means", "does not empty").not().isEmpty(),
        check("means", "more than 1 degits").isLength({ min: 1 }),
    ];

}

const formatErrors = ({ param, msg }) => {
    
    return `[${param}]: ${msg}`;

}

const validate = {
    formatErrors: formatErrors,
    validateUser: validateUser,
    validateVocabulary: validateVocabulary,
};

module.exports = validate;