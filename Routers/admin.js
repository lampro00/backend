const express = require("express");
const path = require("path");
const rootDirname = require("../ulti/path");
const router = express.Router();
const product = [];
router.get("/add-product", (req, res, next) => {
  res.render("add-product", {
    Titlepage: "Title Page",
    path: "/admin/add-product",
  });
});
router.post("/add-product", (req, res, next) => {
  product.push({ title: req.body.title });
  res.redirect("/");
});
exports.routes = router;
exports.product = product;
