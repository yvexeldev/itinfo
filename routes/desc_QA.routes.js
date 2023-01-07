const { Router } = require("express");
const {
  getDesc_QAs,
  getDesc_QA,
  addDesc_QA,
  editDesc_QA,
  deleteDesc_QA,
} = require("../controllers/desc_QA.controller");

const router = Router();

// router.get("/", getDesc_QAs);
// router.get("/:id", getDesc_QA);
// router.post("/", addDesc_QA);
// router.put("/:id", editDesc_QA);
// router.delete("/:id", deleteDesc_QA);

module.exports = router;
