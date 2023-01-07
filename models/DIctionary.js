const { Schema, model } = require("mongoose");

const dictionarySchema = new Schema(
  {
    term: {
      type: String,
      required: true,
      trim: true,
    },
    letter: {
      type: String,
      required:true,
      trim: true
    },
    toLower: {
      type: String,
      lowercase:true,
    }
  },
  {
    versionKey: false,
  }
);

module.exports = model("Dictionary", dictionarySchema);
