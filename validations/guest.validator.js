const Joi = require("joi");

const schema = Joi.object({
    guest_ip: Joi.string().min(8).max(40).required(),
    guest_op: Joi.string().required(),
    guest_device: Joi.string().required(),
    guest_browser: Joi.string().required(),
});
module.exports = schema;
