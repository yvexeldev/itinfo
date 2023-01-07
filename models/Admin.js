const { Schema, model } = require("mongoose");

const adminSchema = new Schema(
    {
        admin_name: {
            type: String,
            required: true,
        },
        admin_email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        admin_password: {
            type: String,
            required: true,
        },
        admin_is_active: {
            type: Boolean,
            required: true,
        },
        admin_is_creator: {
            type: Boolean,
            required: true,
        },
        admin_token: {
            type: String,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = model("Admin", adminSchema);
