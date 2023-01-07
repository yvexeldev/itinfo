const Joi = require("joi");

const UserSchema = Joi.object({
    user_name: Joi.string().min(6).max(40).required(),
    user_email: Joi.string().email().required(),
    user_password: Joi.string().min(5).max(40).required(),
    user_info: Joi.string().min(10).max(100).required(),
    user_photo: Joi.string().min(5).max(40).required(),
});

module.exports = UserSchema;
