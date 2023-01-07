const { Router } = require("express");
const { getTopics, getTopic, addTopic, editTopic, deleteTopic } = require("../controllers/topic.controller");

const router = Router();


router.get("/", getTopics);
router.get("/:id", getTopic);
// router.post("/", addTopic);
// router.put("/:id", editTopic);
// router.delete("/:id", deleteTopic);


module.exports = router;
