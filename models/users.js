// const mongo = require("mongodb");
// const getDb = require("../util/database").getDb;
// class user {
//   constructor(user, email, cart, id) {
//     this.user = user;
//     this.email = email;
//     this.cart = cart;
//     this._id = id;
//   }
//   save() {
//     const DB = getDb();

//     return DB.collection("users")
//       .insertOne(this)
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((err) => console.log(err));
//   }
//   addOrder() {
//     const db = getDb();
//     return this.getcart()
//       .then((product) => {
//         const order = {
//           items: product,
//           user: {
//             _id: new mongo.ObjectId(this._id),
//             user: this.userName,
//           },
//         };
//         return db.collection("orders").insertOne(order);
//       })
//       .then((result) => {
//         this.cart = { items: [] };
//         return db
//           .collection("users")
//           .updateOne(
//             { _id: new mongo.ObjectId(this._id) },
//             { $set: { cart: { items: [] } } }
//           );
//       });
//   }
//   getOrders() {
//     const db = getDb();
//     console.log(this.user, this._id, this.email);
//     return db
//       .collection("orders")
//       .find({ "user._id": new mongo.ObjectId(this._id) })
//       .toArray();
//   }
//   addToCart(product) {
//     const cartProductIndex = this.cart.items.findIndex((cp) => {
//       // console.log(cp.prodId.toString() == product._id.toString());
//       return cp.prodId.toString() == product._id.toString();
//     });
//     let newquantity = 1;
//     const updatedCartItems = [...this.cart.items];
//     if (cartProductIndex >= 0) {
//       console.log("ok");
//       newquantity = this.cart.items[cartProductIndex].quantity + 1;
//       updatedCartItems[cartProductIndex].quantity = newquantity;
//     } else {
//       updatedCartItems.push({
//         prodId: new mongo.ObjectId(product._id),
//         quantity: newquantity,
//       });
//     }
//     const db = getDb();

//     const updatedCart = {
//       items: updatedCartItems,
//     };
//     db.collection("users").updateOne(
//       { _id: new mongo.ObjectId(this._id) },
//       { $set: { cart: updatedCart } }
//     );
//   }
//   getcart() {
//     const db = getDb();
//     const productidi = this.cart.items.map((id) => {
//       return id.prodId;
//     });
//     // console.log(productidi);
//     return db
//       .collection("products")
//       .find({ _id: { $in: productidi } })
//       .toArray()
//       .then((products) => {
//         console.log(products);
//         return products.map((product) => {
//           return {
//             ...product,
//             quantity: this.cart.items.find((q) => {
//               return q.prodId.toString() === product._id.toString();
//             }).quantity,
//           };
//         });
//       });
//   }
//   deleteproductincart(prodId) {
//     const update = this.cart.items.filter((item) => {
//       return item.prodId.toString() !== prodId.toString();
//     });
//     const db = getDb();

//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new mongo.ObjectId(this._id) },
//         { $set: { cart: { items: update } } }
//       );
//   }

//   static findById(userId) {
//     const DB = getDb();
//     return DB.collection("users")
//       .find({ _id: new mongo.ObjectId(userId) })
//       .next()
//       .then((user) => {
//         console.log(user);
//         return user;
//       })
//       .catch((err) => console.log(err));
//   }
// }
// module.exports = user;
