const { Router } = require("express");
const {
    getAdmins,
    getAdmin,
    addAdmin,
    editAdmin,
    deleteAdmin,
    loginAdmin,
    logOutAdmin,
    refreshAdminToken,
    ForgetPassword,
} = require("../controllers/admin.controller");
const {
    addAuthor,
    loginAuthor,
    editAuthor,
    deleteAuthor,
    getAuthors,
    getAuthor,
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
    getCategory,
    getCategorys,
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
    deleteTag,
    editTag,
    addTag,
    getTag,
    getTags,
} = require("../controllers/tag.controller");
const {
    addTopic,
    editTopic,
    deleteTopic,
    getTopics,
    getTopic,
} = require("../controllers/topic.controller");
const {
    addUser,
    editUser,
    deleteUser,
    getUsers,
    getUser,
} = require("../controllers/user.controller");
const express = require("express");
const adminWorkPolice = require("../middleware/adminWorkPolice");
const adminEditPolice = require("../middleware/adminEditPolice");
const creatorPolice = require("../middleware/creatorPolice");
const validator = require("../middleware/validator");

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
    rout.prefix("/", (admin) => {
        admin.get("/", adminWorkPolice, getAdmins);
        admin.post("/forget", ForgetPassword);
        admin.get("/refresh", refreshAdminToken);
        admin.get("/get/:id", adminWorkPolice, getAdmin);
        admin.post("/", validator("admin"), addAdmin);
        admin.put("/:id", validator("admin"), editAdmin);
        admin.delete("/:id", adminEditPolice, deleteAdmin);
        admin.post("/login", loginAdmin);
        admin.post("/logout", logOutAdmin);
    });
    rout.prefix("/author_social", (author_social) => {
        author_social.get("/", adminWorkPolice, getAuthor_Socials);
        author_social.get("/:id", adminWorkPolice, getAuthor_Social);
        author_social.post("/", adminWorkPolice, addAuthor_Social);
        author_social.put("/:id", adminWorkPolice, editAuthor_Social);
        author_social.delete("/:id", adminWorkPolice, deleteAuthor_Social);
    });
    rout.prefix("/author", (author) => {
        author.get("/", adminWorkPolice, getAuthors);
        author.get("/:id", adminWorkPolice, getAuthor);
        author.post("/", adminWorkPolice, addAuthor);
        author.put("/:id", adminWorkPolice, editAuthor);
        author.delete("/:id", adminWorkPolice, deleteAuthor);
    });
    rout.prefix("/category", (category) => {
        category.get("/", adminWorkPolice, getCategorys);
        category.get("/:id", adminWorkPolice, getCategory);
        category.post("/", adminWorkPolice, addCategory);
        category.put("/:id", adminWorkPolice, editCategory);
        category.delete("/:id", adminWorkPolice, deleteCategory);
    });
    rout.prefix("/desc_qa", (desc_qa) => {
        desc_qa.get("/", adminWorkPolice, getDesc_QAs);
        desc_qa.get("/:id", adminWorkPolice, getDesc_QA);
        desc_qa.post("/", adminWorkPolice, addDesc_QA);
        desc_qa.put("/:id", adminWorkPolice, editDesc_QA);
        desc_qa.delete("/:id", adminWorkPolice, deleteDesc_QA);
    });
    rout.prefix("/desc_topic", (desc_topic) => {
        desc_topic.get("/", adminWorkPolice, getDesc_Topics);
        desc_topic.get("/:id", adminWorkPolice, getDesc_Topic);
        desc_topic.post("/", adminWorkPolice, addDesc_Topic);
        desc_topic.put("/:id", adminWorkPolice, editDesc_Topic);
        desc_topic.delete("/:id", adminWorkPolice, deleteDesc_Topic);
    });
    rout.prefix("/description", (description) => {
        description.get("/", adminWorkPolice, getDescriptions);
        description.get("/:id", adminWorkPolice, getDescription);
        description.post("/", adminWorkPolice, addDescription);
        description.put("/:id", adminWorkPolice, editDescription);
        description.delete("/:id", adminWorkPolice, deleteDescription);
    });
    rout.prefix("/dictionary", (dictionary) => {
        dictionary.get("/", adminWorkPolice, getDictionarys);
        dictionary.get("/:id", adminWorkPolice, getDictionary);
        dictionary.post("/", adminWorkPolice, addDictionary);
        dictionary.put("/:id", adminWorkPolice, editDictionary);
        dictionary.delete("/:id", adminWorkPolice, deleteDictionary);
    });
    rout.prefix("/media", (media) => {
        media.get("/", adminWorkPolice, getMedias);
        media.get("/:id", adminWorkPolice, getMedia);
        media.post("/", adminWorkPolice, addMedia);
        media.put("/:id", adminWorkPolice, editMedia);
        media.delete("/:id", adminWorkPolice, deleteMedia);
    });
    rout.prefix("/question_answer", (question_answer) => {
        question_answer.get("/", adminWorkPolice, getQuestion_Answers);
        question_answer.get("/:id", adminWorkPolice, getQuestion_Answer);
        question_answer.post("/", adminWorkPolice, addQuestion_Answer);
        question_answer.put("/:id", adminWorkPolice, editQuestion_Answer);
        question_answer.delete("/:id", adminWorkPolice, deleteQuestion_Answer);
    });
    rout.prefix("/social", (social) => {
        social.get("/", adminWorkPolice, getSocials);
        social.get("/:id", adminWorkPolice, getSocial);
        social.post("/", adminWorkPolice, addSocial);
        social.put("/:id", adminWorkPolice, editSocial);
        social.delete("/:id", adminWorkPolice, deleteSocial);
    });
    rout.prefix("/synonym", (synonym) => {
        synonym.get("/", adminWorkPolice, getSynonyms);
        synonym.get("/:id", adminWorkPolice, getSynonym);
        synonym.post("/", adminWorkPolice, addSynonym);
        synonym.put("/:id", adminWorkPolice, editSynonym);
        synonym.delete("/:id", adminWorkPolice, deleteSynonym);
    });
    rout.prefix("/tag", (tag) => {
        tag.get("/", adminWorkPolice, getTags);
        tag.get("/:id", adminWorkPolice, getTag);
        tag.post("/", adminWorkPolice, addTag);
        tag.put("/:id", adminWorkPolice, editTag);
        tag.delete("/:id", adminWorkPolice, deleteTag);
    });
    rout.prefix("/topic", (topic) => {
        topic.get("/", adminWorkPolice, getTopics);
        topic.get("/:id", adminWorkPolice, getTopic);
        topic.post("/", adminWorkPolice, addTopic);
        topic.put("/:id", adminWorkPolice, editTopic);
        topic.delete("/:id", adminWorkPolice, deleteTopic);
    });
    rout.prefix("/user", (user) => {
        user.get("/", adminWorkPolice, getUsers);
        user.get("/:id", adminWorkPolice, getUser);
        user.post("/", adminWorkPolice, addUser);
        user.put("/:id", adminWorkPolice, editUser);
        user.delete("/:id", adminWorkPolice, deleteUser);
    });
});

module.exports = router;
