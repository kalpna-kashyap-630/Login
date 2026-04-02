const joi = require('joi');

const signupValidation = (req, res, next) => {
    const Schema = joi.object({
        name: joi.string().min(3).max(100).required(),
        number: joi.string().min(10).max(10).required(),
        email: joi.string().email().required(),
        password: joi.string().min(4).max(100).required(),
        confirm_password: joi.string().min(4).max(100).required()

    });

    const { error } = Schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: "Bad request",
            error: error.details[0].message
        });
    }

    next();
};

const loginupValidation = (req, res, next) => {
    const Schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(4).max(100).required()
    });

    const { error } = Schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: "Bad request",
            error: error.details[0].message
        });
    }

    next();
};

module.exports = {
    signupValidation,
    loginupValidation
};
