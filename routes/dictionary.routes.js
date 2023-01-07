const { Router } = require("express");
const {
  getDictionarys,
  getDictionary,
  addDictionary,
  editDictionary,
  deleteDictionary,
} = require("../controllers/dictionary.controller");
const adminPolice = require("../middleware/adminEditPolice");

const router = Router();

router.get("/", getDictionarys);
router.get("/:id", getDictionary);
// router.post("/", addDictionary);
// router.put("/:id", editDictionary);
// router.delete("/:id", deleteDictionary);

module.exports = router;
