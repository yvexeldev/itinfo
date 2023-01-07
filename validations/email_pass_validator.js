const Joi = require("joi");

const emailPasSchema = Joi.object({
    user_email: Joi.string().email().required(),
    user_password: Joi.string().min(6).max(30).required(),
});
module.exports = emailPasSchema;
