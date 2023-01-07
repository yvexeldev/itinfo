const { Router } = require("express");
const validator = require("../middleware/validator");
const {
    getAuthors,
    getAuthor,
    addAuthor,
    editAuthor,
    deleteAuthor,
    loginAuthor,
    logOutAuthor,
    refreshAuthorToken,
    authorActivate,
    ForgetPassword,
} = require("../controllers/author.controller");
const {
    addAuthor_Social,
    editAuthor_Social,
    deleteAuthor_Social,
    getAuthor_Socials,
    getAuthor_Social,
} = require("../controllers/author_social_controller");
const {
    addCategory,
    editCategory,
    deleteCategory,
    getCategorys,
    getCategory,
} = require("../controllers/category.controller");
const {
    addDescription,
    editDescription,
    deleteDescription,
    getDescriptions,
    getDescription,
} = require("../controllers/description.cotroller");
const {
    addDesc_QA,
    editDesc_QA,
    deleteDesc_QA,
    getDesc_QAs,
    getDesc_QA,
} = require("../controllers/desc_QA.controller");
const {
    addDesc_Topic,
    editDesc_Topic,
    deleteDesc_Topic,
    getDesc_Topics,
    getDesc_Topic,
} = require("../controllers/desc_topic.controller");
const {
    addDictionary,
    editDictionary,
    deleteDictionary,
    getDictionarys,
    getDictionary,
} = require("../controllers/dictionary.controller");
const {
    addMedia,
    editMedia,
    deleteMedia,
    getMedias,
    getMedia,
} = require("../controllers/media.controller");
const {
    addQuestion_Answer,
    editQuestion_Answer,
    deleteQuestion_Answer,
    getQuestion_Answers,
    getQuestion_Answer,
} = require("../controllers/question_answer.controller");
const {
    editSocial,
    deleteSocial,
    addSocial,
    getSocials,
    getSocial,
} = require("../controllers/social.controller");
const {
    addSynonym,
    editSynonym,
    deleteSynonym,
    getSynonyms,
    getSynonym,
} = require("../controllers/synonym.controller");
const {
    addTag,
    editTag,
    deleteTag,
    getTags,
    getTag,
} = require("../controllers/tag.controller");
const {
    addTopic,
    editTopic,
    deleteTopic,
    getTopics,
    getTopic,
} = require("../controllers/topic.controller");
const authorWorkPolice = require("../middleware/authorWorkPolice");
const express = require("express");
express.application.prefix = express.Router.prefix = function (
    path,
    configure
) {
    const router = express.Router();
    this.use(path, router);
    configure(router);
    return router;
};
const router = Router();

router.prefix("/", (rout) => {
    rout.prefix("/", (author) => {
        author.post("/add", addAuthor);
        author.get("/", getAuthors);
        author.post("/forget", ForgetPassword);
        author.get("/activate/:link", authorActivate);
        author.get("/refresh", refreshAuthorToken);
        author.get("/get/:id", authorWorkPolice, getAuthor);
        author.post("/login", loginAuthor);
        author.put("/:id", authorWorkPolice, editAuthor);
        author.delete("/:id", authorWorkPolice, deleteAuthor);
        author.post("/logout", logOutAuthor);
    });
    rout.prefix("/", (author_social) => {
        author_social.get("/", authorWorkPolice, getAuthor_Socials);
        author_social.get("get/:id", authorWorkPolice, getAuthor_Social);
        author_social.post("/", authorWorkPolice, addAuthor_Social);
        author_social.put("/:id", authorWorkPolice, editAuthor_Social);
        author_social.delete("/:id", authorWorkPolice, deleteAuthor_Social);
    });
    rout.prefix("/category", (category) => {
        category.get("/", authorWorkPolice, getCategorys);
        category.get("/:id", authorWorkPolice, getCategory);
        category.post("/", authorWorkPolice, addCategory);
        category.put("/:id", authorWorkPolice, editCategory);
        category.delete("/:id", authorWorkPolice, deleteCategory);
    });
    rout.prefix("/desc_qa", (desc_qa) => {
        desc_qa.get("/", authorWorkPolice, getDesc_QAs);
        desc_qa.get("/:id", authorWorkPolice, getDesc_QA);
        desc_qa.post("/", authorWorkPolice, addDesc_QA);
        desc_qa.put("/:id", authorWorkPolice, editDesc_QA);
        desc_qa.delete("/:id", authorWorkPolice, deleteDesc_QA);
    });
    rout.prefix("/desc_topic", (desc_topic) => {
        desc_topic.get("/", authorWorkPolice, getDesc_Topics);
        desc_topic.get("/:id", authorWorkPolice, getDesc_Topic);
        desc_topic.post("/", authorWorkPolice, addDesc_Topic);
        desc_topic.put("/:id", authorWorkPolice, editDesc_Topic);
        desc_topic.delete("/:id", authorWorkPolice, deleteDesc_Topic);
    });
    rout.prefix("/description", (description) => {
        description.get("/", authorWorkPolice, getDescriptions);
        description.get("/:id", authorWorkPolice, getDescription);
        description.post("/", authorWorkPolice, addDescription);
        description.put("/:id", authorWorkPolice, editDescription);
        description.delete("/:id", authorWorkPolice, deleteDescription);
    });
    rout.prefix("/dictionary", (dictionary) => {
        dictionary.get("/", authorWorkPolice, getDictionarys);
        dictionary.get("/:id", authorWorkPolice, getDictionary);
        dictionary.post("/", authorWorkPolice, addDictionary);
        dictionary.put("/:id", authorWorkPolice, editDictionary);
        dictionary.delete("/:id", authorWorkPolice, deleteDictionary);
    });
    rout.prefix("/media", (media) => {
        media.get("/", authorWorkPolice, getMedias);
        media.get("/:id", authorWorkPolice, getMedia);
        media.post("/", authorWorkPolice, addMedia);
        media.put("/:id", authorWorkPolice, editMedia);
        media.delete("/:id", authorWorkPolice, deleteMedia);
    });
    rout.prefix("/question_answer", (question_answer) => {
        question_answer.get("/", authorWorkPolice, getQuestion_Answers);
        question_answer.get("/:id", authorWorkPolice, getQuestion_Answer);
        question_answer.post("/", authorWorkPolice, addQuestion_Answer);
        question_answer.put("/:id", authorWorkPolice, editQuestion_Answer);
        question_answer.delete("/:id", authorWorkPolice, deleteQuestion_Answer);
    });
    rout.prefix("/social", (social) => {
        social.get("/", authorWorkPolice, getSocials);
        social.get("/:id", authorWorkPolice, getSocial);
        social.post("/", authorWorkPolice, addSocial);
        social.put("/:id", authorWorkPolice, editSocial);
        social.delete("/:id", authorWorkPolice, deleteSocial);
    });
    rout.prefix("/synonym", (synonym) => {
        synonym.get("/", authorWorkPolice, getSynonyms);
        synonym.get("/:id", authorWorkPolice, getSynonym);
        synonym.post("/", authorWorkPolice, addSynonym);
        synonym.put("/:id", authorWorkPolice, editSynonym);
        synonym.delete("/:id", authorWorkPolice, deleteSynonym);
    });
    rout.prefix("/tag", (tag) => {
        tag.get("/", authorWorkPolice, getTags);
        tag.get("/:id", authorWorkPolice, getTag);
        tag.post("/", authorWorkPolice, addTag);
        tag.put("/:id", authorWorkPolice, editTag);
        tag.delete("/:id", authorWorkPolice, deleteTag);
    });
    rout.prefix("/topic", (topic) => {
        topic.get("/", authorWorkPolice, getTopics);
        topic.get("/:id", authorWorkPolice, getTopic);
        topic.post("/", authorWorkPolice, addTopic);
        topic.put("/:id", authorWorkPolice, editTopic);
        topic.delete("/:id", authorWorkPolice, deleteTopic);
    });
});

module.exports = router;
