const { Router } = require("express");
const { getCategorys, getCategory, addCategory, editCategory, deleteCategory } = require("../controllers/category.controller");

const router = Router();

router.get("/", getCategorys);
router.get("/:id", getCategory);
// router.post("/", addCategory);
// router.put("/:id", editCategory);
// router.delete("/:id", deleteCategory);

module.exports = router;
