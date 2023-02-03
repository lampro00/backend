const Product = require("../models/product");
const Order = require("../models/order");

exports.getProducts = (req, res, next) => {
  Product.findAll()
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
  Product.findAll({ where: { id: prodId } }).then((product) => {
    res.render("shop/product-detail", {
      product: product[0],
      pageTitle: product[0].title,
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
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
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((product) => {
          res.render("shop/cart", {
            path: "/cart",
            pageTitle: "Your Cart",
            products: product,
          });
        })
        .catch((err) => console.log(err));
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
  let fetchedcart;
  let newquantity = 1;
  req.user
    .getCart()
    .then((cart) => {
      fetchedcart = cart;

      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        let oldQuantity = product.cartitem.quantity;
        newquantity = oldQuantity + 1;
      }
      return Product.findAll({ where: { id: prodId } });
    })
    .then((product) => {
      return fetchedcart.addProduct(product, {
        through: { quantity: newquantity },
      });
    })
    .then(() => res.redirect("/cart"))
    .catch((err) => console.log(err));
  // Product.findAll({ where: { id: prodId } }).then((product) => {
  //   Cart.addProduct(prodId, product.price);
  //   res.redirect("/cart");
  // });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: prodId } }).then((products) => {
        let product = products[0];
        product.cartitem.destroy();
      });
    })
    .then(() => res.redirect("/cart"))
    .catch((err) => console.log(err));
  // Product.findAll({ where: { id: prodId } }).then((product) => {
  //   Cart.deleteProduct(prodId, product.price);
  //   res.redirect("/cart");
  // });
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ["products"] })
    .then((orders) => {
      // console.log(orders[1].products[1].orderitem);
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        order: orders,
      });
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      console.log(products);
      return req.user
        .createOrder()
        .then((order) => {
          return order.addProducts(
            products.map((product) => {
              product.orderitem = { quantity: product.cartitem.quantity };
              return product;
            })
          );
        })
        .catch((err) => console.log(err));
    })
    .then((result) => {
      return fetchedCart.setProducts(null);
    })
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};
