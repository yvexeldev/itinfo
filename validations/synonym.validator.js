const Joi = require("joi");

const synonymschema = Joi.object({
    desc_id: Joi.string().alphanum().length(24).required(),
    dict_id: Joi.string().alphanum().length(24).required(),
});

module.exports = synonymschema;
