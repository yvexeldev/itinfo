const { Router } = require("express");
const { getSynonyms, getSynonym, addSynonym, editSynonym, deleteSynonym } = require("../controllers/synonym.controller");

const router = Router();


router.get("/", getSynonyms);
router.get("/:id", getSynonym);
// router.post("/", addSynonym);
// router.put("/:id", editSynonym);
// router.delete("/:id", deleteSynonym);


module.exports = router;
