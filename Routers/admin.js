const express = require("express");
const path = require("path");
const rootDirname = require("../ulti/path");
const router = express.Router();
router.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDirname, "View", "index.html"));
});
module.exports = router;
