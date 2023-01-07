const { Schema, model } = require("mongoose");

const Author_SocialSchema = new Schema({
  author_id: {
    type: Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  social_id: {
    type: Schema.Types.ObjectId,
    ref: "Social",
    required: true,
  },
  social_link: {
    type: String,
    required: true,
    unique:true,
  }
}, {
  versionKey:false
});
module.exports = model("Author_Social", Author_SocialSchema);
