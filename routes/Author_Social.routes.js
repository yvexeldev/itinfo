const { Router } = require("express");
const { getAuthor_Socials, getAuthor_Social, addAuthor_Social, editAuthor_Social, deleteAuthor_Social } = require("../controllers/author_social_controller");

const router = Router();


// router.get("/", getAuthor_Socials);
// router.get("/:id", getAuthor_Social);
// router.post("/", addAuthor_Social);
// router.put("/:id", editAuthor_Social);
// router.delete("/:id", deleteAuthor_Social);


module.exports = router;
