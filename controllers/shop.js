const Product = require("../models/product");
const User = require("../models/users");
// const Order = require("../models/order");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((product) => {
      res.render("shop/product-list", {
        prods: product,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId).then((product) => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((product) => {
      res.render("shop/index", {
        prods: product,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .getcart()
    .then((product) => {
      console.log(product);
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: product,
      });
    })
    .catch((err) => console.log(err));

  // Product.fetchAll((products) => {
  //   const cartProducts = [];
  //   for (product of products) {
  //     const cartProductData = cart.products.find(
  //       (prod) => prod.id === product.id
  //     );
  //     if (cartProductData) {
  //       cartProducts.push({ productData: product, qty: cartProductData.qty });
  //     }
  //   }
  //
  // });
  // });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      res.redirect("/cart");
    });
};
// let fetchedcart;
// let newquantity = 1;
// req.user
//   .getCart()
//   .then((cart) => {
//     fetchedcart = cart;

//     return cart.getProducts({ where: { id: prodId } });
//   })
//   .then((products) => {
//     let product;
//     if (products.length > 0) {
//       product = products[0];
//     }
//     if (product) {
//       let oldQuantity = product.cartitem.quantity;
//       newquantity = oldQuantity + 1;
//     }
//     return Product.findAll({ where: { id: prodId } });
//   })
//   .then((product) => {
//     return fetchedcart.addProduct(product, {
//       through: { quantity: newquantity },
//     });
//   })
//   .then(() => res.redirect("/cart"))
//   .catch((err) => console.log(err));
// Product.findAll({ where: { id: prodId } }).then((product) => {
//   Cart.addProduct(prodId, product.price);
//   res.redirect("/cart");
// });
// };

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteproductincart(prodId)
    .then((RETURN) => res.redirect("/cart"))
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then((orders) => {
      console.log(orders);
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        order: orders,
      });
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .addOrder()
    .then((result) => {
      console.log(result);
      // return fetchedCart.setProducts(null);
    })
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};
