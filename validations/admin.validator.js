const Joi = require("joi");
const adminschema = Joi.object({
    admin_name: Joi.string().min(5).max(30).required(),
    admin_email: Joi.string().email(),
    admin_password: Joi.string().min(6).max(40).required(),
    admin_is_active: Joi.boolean().required(),
    admin_is_creator: Joi.boolean().default(false),
});
module.exports = adminschema;
