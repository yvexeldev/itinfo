const { Schema, model } = require("mongoose");

const tagSchema = new Schema(
  {
    topic_id: {
      type: Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Tag", tagSchema);
