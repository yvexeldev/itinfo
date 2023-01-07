const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        user_name: {
            type: String,
            required: true,
        },
        user_email: {
            type: String,
            required: true,
            lowercase: true,
        },
        user_password: {
            type: String,
            required: true,
        },
        user_info: {
            type: String,
            default: "I am User of ITinfo.uz",
        },
        user_photo: {
            type: String,
            default: "/img/default_user.jpg",
        },
        user_is_active: {
            type: Boolean,
            default: false,
        },
        user_activation_link: {
            type: String,
        },
        user_token: {
            type: String,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = model("User", userSchema);
