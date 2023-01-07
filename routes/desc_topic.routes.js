const { Router } = require("express");
const { getDesc_Topics, getDesc_Topic, addDesc_Topic, deleteDesc_Topic, editDesc_Topic } = require("../controllers/desc_topic.controller");

const router = Router();

// router.get("/", getDesc_Topics);
// router.get("/:id", getDesc_Topic);
// router.post("/", addDesc_Topic);
// router.put("/:id", editDesc_Topic);
// router.delete("/:id", deleteDesc_Topic);

module.exports = router;
