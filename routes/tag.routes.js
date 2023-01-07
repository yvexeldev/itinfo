const { Router } = require("express");
const {
  getTags,
  addTag,
  editTag,
  getTag,
  deleteTag,
} = require("../controllers/tag.controller");

const router = Router();

router.get("/", getTags);
router.get("/:id", getTag);
// router.post("/", addTag);
// router.put("/:id", editTag);
// router.delete("/:id", deleteTag);

module.exports = router;
