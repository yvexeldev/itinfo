const { Schema, model } = require("mongoose");

const desc_QASchema = new Schema(
  {
    qa_id: {
      type: Schema.Types.ObjectId,
      ref: "Quetion_Answer",
      required: true,
    },
    desc_id: {
      type: Schema.Types.ObjectId,
      ref: "Description",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Desc_QA", desc_QASchema);
