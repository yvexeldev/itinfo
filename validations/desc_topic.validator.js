const Joi = require("joi");

const descTopicschema = Joi.object({
    desc_id: Joi.string().alphanum().length(24).required(),
    topic_id: Joi.string().alphanum().length(24).required(),
});
module.exports = descTopicschema;
