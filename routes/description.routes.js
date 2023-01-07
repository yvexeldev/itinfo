const { Router } = require("express");
const { getDescriptions, getDescription, addDescription, editDescription, deleteDescription } = require("../controllers/description.cotroller");

const router = Router();

router.get("/", getDescriptions);
router.get("/:id", getDescription);
// router.post("/", addDescription);
// router.put("/:id", editDescription);
// router.delete("/:id", deleteDescription);

module.exports = router;
