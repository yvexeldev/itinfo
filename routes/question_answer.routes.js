const { Router } = require("express");
const { getQuestion_Answers, getQuestion_Answer, addQuestion_Answer, editQuestion_Answer, deleteQuestion_Answer } = require("../controllers/question_answer.controller");


const router = Router();

router.get("/", getQuestion_Answers);
router.get("/:id", getQuestion_Answer);
// router.post("/", addQuestion_Answer);
// router.put("/:id", editQuestion_Answer);
// router.delete("/:id", deleteQuestion_Answer);

module.exports = router;
