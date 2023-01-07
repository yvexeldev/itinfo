const { Router } = require("express");
const {
  getMedias,
  addMedia,
  editMedia,
  deleteMedia,
  getMedia,
} = require("../controllers/media.controller");

const router = Router();

// router.get("/", getMedias);
// router.get("/:id", getMedia);
// router.post("/", addMedia);
// router.put("/:id", editMedia);
// router.delete("/:id", deleteMedia);

module.exports = router;
