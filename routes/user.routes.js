const { Router } = require("express");
const express = require("express");
const {
    getCategorys,
    getCategory,
} = require("../controllers/category.controller");
const {
    getDescriptions,
    getDescription,
} = require("../controllers/description.cotroller");
const {
    getDictionary,
    getDictionarys,
} = require("../controllers/dictionary.controller");
const {
    getQuestion_Answers,
    getQuestion_Answer,
} = require("../controllers/question_answer.controller");
const {
    getSynonyms,
    getSynonym,
} = require("../controllers/synonym.controller");
const { getTopics, getTopic } = require("../controllers/topic.controller");
const {
    getUsers,
    getUser,
    addUser,
    editUser,
    deleteUser,
    loginUser,
    logOutUser,
    refreshUserToken,
    userActivate,
    ForgetPassword,
} = require("../controllers/user.controller");
const userEditPolice = require("../middleware/userEditPolice");
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
    rout.prefix("/", (user) => {
        user.get("/refresh", refreshUserToken);
        user.get("/activate/:link", userActivate);
        user.get("/:id", userEditPolice, getUser);
        user.post("/forget", ForgetPassword);
        user.put("/:id", userEditPolice, editUser);
        user.delete("/:id", userEditPolice, deleteUser);
        user.post("/login", loginUser);
        user.post("/add", addUser);
        user.post("/logout", logOutUser);
    });
    rout.prefix("/dictionary", (dictionary) => {
        dictionary.get("/", getDictionarys);
        dictionary.get("/:id", getDictionary);
    });
    rout.prefix("/category", (category) => {
        category.get("/", getCategorys);
        category.get("/:id", getCategory);
    });
    rout.prefix("/topic", (topic) => {
        topic.get("/", getTopics);
        topic.get("/:id", getTopic);
    });
    rout.prefix("/description", (description) => {
        description.get("/", getDescriptions);
        description.get("/:id", getDescription);
    });
    rout.prefix("/synonym", (synonym) => {
        synonym.get("/", getSynonyms);
        synonym.get("/:id", getSynonym);
    });
    rout.prefix("/question_answer", (question_answer) => {
        question_answer.get("/", getQuestion_Answers);
        question_answer.get("/:id", getQuestion_Answer);
    });
});
module.exports = router;
