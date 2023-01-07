const Joi = require("joi");

const descqaschema = Joi.object({
    qa_id: Joi.string().alphanum().length(24).required(),
    desc_id: Joi.string().alphanum().length(24).required(),
});

module.exports = descqaschema;
