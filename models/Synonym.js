const { Schema, model } = require("mongoose");

const synonymSchema = new Schema(
  {
    desc_id: {
      type: Schema.Types.ObjectId,
      ref: "Description",
      requied: true,
    },
    dict_id: {
      type: Schema.Types.ObjectId,
      ref: "Dictionary",
      requied: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Synonym", synonymSchema);
