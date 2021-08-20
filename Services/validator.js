const { check } = require("express-validator");

const validateUser = () => {

    return [
        check("username", "Does not empty").not().isEmpty(),
        check("username", "More than 1 degits").isLength({ min: 2 }),
        check("password", "Does not empty").not().isEmpty(),
        check("password", "More than 2 degits").isLength({ min: 2 })
    ];

}

const validateVocabulary = () => {

    return [
        check("topic", "Does not empty").not().isEmpty(),
        check("topic", "More than 2 degits").isLength({ min: 2 }),
        check("vocabulary", "Does not empty").not().isEmpty(),
        check("vocabulary", "More than 2 degits").isLength({ min: 2 }),
        check("means", "Does not empty").not().isEmpty(),
        check("means", "More than 2 degits").isLength({ min: 2 }),
    ];

}

const formatErrors = ({ param, msg }) => {
    
    return `[${param}]: ${msg}`;

}

const validate = {
    validateUser: validateUser,
    validateVocabulary: validateVocabulary,
    formatErrors: formatErrors,
};

module.exports = validate;