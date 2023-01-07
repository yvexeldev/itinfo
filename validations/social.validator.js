const Joi = require("joi");

const socschema = Joi.object({
    social_name: Joi.string().max(20).required(),
    social_icon_file: Joi.string().required(),
});

module.exports = socschema;
