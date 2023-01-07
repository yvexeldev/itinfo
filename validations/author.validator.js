const Joi = require("joi");

const generateNickname = (parent, helpers) => {
    return (
        parent.author_first_name.toLowerCase() +
        "-" +
        parent.author_last_name.toLowerCase()
    );
};

const authorSchema = Joi.object({
    author_first_name: Joi.string()
        .pattern(new RegExp("^[a-zA-Z]{1,50}$"))
        .required(),
    author_last_name: Joi.string()
        .pattern(new RegExp("^[a-zA-Z]{1,50}$"))
        .required(),
    author_nick_name: Joi.string().max(30).default(generateNickname),
    author_email: Joi.string().email(),
    author_phone: Joi.string()
        .max(17)
        .pattern(/\d{2}-\d{3}-\d{2}-\d{2}/),
    author_password: Joi.string().min(6).max(30),
    confirm_password: Joi.ref("author_password"),
    author_info: Joi.string(),
    author_position: Joi.string(),
    author_photo: Joi.string().default("/author/default.png"),
    is_expert: Joi.boolean().default(false),
});

const phoneValidator = (login) => {
    const schema = Joi.object({
        login: Joi.string()
            .max(17)
            .pattern(/\d{2}-\d{3}-\d{2}-\d{2}/),
    });
    return schema.validate(login);
};

const emailValidator = (login) => {
    const schema = Joi.object({
        login: Joi.string().email(),
    });
    return schema.validate(login);
};
module.exports = { authorSchema, phoneValidator, emailValidator };
