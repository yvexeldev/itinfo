const { Schema, model } = require("mongoose");

const desc_topicSchema = new Schema(
  {
    desc_id: {
      type: Schema.Types.ObjectId,
      ref: "Description",
      requied: true,
    },
    topic_id: {
      type: Schema.Types.ObjectId,
      ref: "Topic",
      requied: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Desc_Topic", desc_topicSchema);
