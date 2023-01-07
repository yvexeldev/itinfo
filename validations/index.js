const admin = require("./admin.validator");
const user = require("./user.validator");
const email_pass = require("./email_pass_validator");
const author = require("./author.validator");
const author_social = require("./author_social.validator");
const description = require("./description.validator");
const desc_topic = require("./desc_topic.validator");
const desc_qa = require("./desc_qa.validator");
const category = require("./category.validator");
const dictionary = require("./dictionary.validator");
const guest = require("./guest.validator");
const media = require("./media.validator");
const question_answer = require("./question_answer.validator");
const social = require("./social.validator");
const synonym = require("./synonym.validator");
const tag = require("./tag.validator");
const topic = require("./topic.validator");

module.exports = {
    admin,
    user,
    email_pass,
    author,
    desc_qa,
    desc_topic,
    description,
    category,
    dictionary,
    guest,
    media,
    question_answer,
    social,
    synonym,
    tag,
    topic,
};
