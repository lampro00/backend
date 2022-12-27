const express = require("express");
const path = require("path");
const rootDirname = require("../ulti/path");
const router = express.Router();
router.get("/users", (req, res, next) => {
  res.sendFile(path.join(rootDirname, "View", "users.html"));
});
module.exports = router;
