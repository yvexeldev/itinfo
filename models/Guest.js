const { Schema, model } = require("mongoose");

const guestSchema = new Schema(
  {
    guest_ip: {
      type: String,
      required: true,
    },
    guest_os: {
      type: String,
    },
    guest_device: {
      type: String,
      required: true,
    },
    guest_browser: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestapms: true,
  }
);

module.exports = model("Guest", guestSchema);
