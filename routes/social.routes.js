const { Router } = require("express");
const { getSocials, getSocial, addSocial, editSocial, deleteSocial } = require("../controllers/social.controller");

const router = Router();


router.get("/", getSocials);
router.get("/:id", getSocial);
// router.post("/", addSocial);
// router.put("/:id", editSocial);
// router.delete("/:id", deleteSocial);


module.exports = router;
