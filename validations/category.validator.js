const Joi = require("joi");

const categoryschema = Joi.object({
    category_name: Joi.string()
        .min(2)
        .message("Kategoriya nomi 2 harfdan kam bo'lmasligi kerak")
        .max(255)
        .message("Kategoriyada nomi 255 ta harfdan uzun bo'lmasligi kerak!")
        .required(),
    parent_category_id: Joi.string().alphanum(),
});

module.exports = categoryschema;
