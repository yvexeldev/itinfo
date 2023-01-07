const Joi = require("joi");

const topicschema = Joi.object({
    author_id: Joi.string().alphanum().length(24).required(),
    topic_title: Joi.string().min(5).max(50).required(),
    topic_text: Joi.string().min(10).max(100).required(),
    is_checked: Joi.boolean().required(),
    is_approwed: Joi.boolean().required(),
    expert_id: Joi.string().alphanum().length(24).required(),
});

module.exports = topicschema;
