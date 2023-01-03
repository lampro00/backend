const Product = require("../models/product");
// const bodyParser = require("body-parser");
exports.getAddProduct = (req, res, next) => {
  Product.fetchAll((products) => {
    res.status(200).send(JSON.stringify(products));
    res.redirect("/");
  });
};
exports.postAddProduct = (req, res, next) => {
  const title = req.body.body.t;
  const imageUrl = req.body.body.i;
  const description = req.body.body.d;
  const price = req.body.body.p;
  console.log("req.body", req.body);
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.status(200).send(JSON.stringify(products));
  });
};
