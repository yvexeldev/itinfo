const { Schema, model } = require("mongoose");

const AuthorSchema = new Schema(
    {
        author_first_name: {
            type: String,
            required: true,
            trim: true,
        },
        author_last_name: {
            type: String,
            required: true,
            trim: true,
        },
        author_nick_name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        author_email: {
            type: String,
            required: true,
            trim: true,
        },
        author_phone: {
            type: String,
            required: true,
            trim: true,
        },
        author_password: {
            type: String,
            required: true,
            trim: true,
        },
        author_info: {
            type: String,
            required: true,
            trim: true,
        },
        author_position: {
            type: String,
            required: true,
            trim: true,
        },
        author_photo: {
            type: String,
            default: "/img/author.photo.jpg",
            trim: true,
        },
        is_expert: {
            type: Boolean,
            required: true,
        },
        author_is_active: {
            type: Boolean,
            default: false,
        },
        author_token: {
            type: String,
        },
        author_activation_link: {
            type: String,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = model("Author", AuthorSchema);
