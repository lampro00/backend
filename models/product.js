const mongoose = require("mongoose");
const schema = mongoose.Schema;
const ProductSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    require: true,
  },
});

// const monggo = require("mongodb");
// const getDb = require("../util/database").getDb;
// class Product {
//   constructor(title, price, imageUrl, description, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     id && (this._id = new monggo.ObjectId(id));
//     this.userId = userId;
//   }
//   save() {
//     const DB = getDb();
//     let Dbop;
//     if (this._id) {
//       // console.log("annnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn");

//       Dbop = DB.collection("products").updateOne(
//         { _id: this._id },
//         { $set: this }
//       );
//     } else {
//       // console.log("adsssssssssssssssssssssssssssssssssssssssssssssssssssssss");
//       Dbop = DB.collection("products").insertOne(this);
//     }
//     return Dbop.then((result) => {
//       console.log(result);
//     }).catch((err) => console.log(err));
//   }
//   static fetchAll() {
//     const DB = getDb();
//     return DB.collection("products")
//       .find()
//       .toArray()
//       .then((Products) => {
//         // console.log(Products);
//         return Products;
//       })
//       .catch((err) => console.log(err));
//   }
//   static findById(prodId) {
//     const DB = getDb();
//     return DB.collection("products")
//       .find({ _id: new monggo.ObjectId(prodId) })
//       .next()
//       .then((Products) => {
//         console.log(Products);
//         return Products;
//       })
//       .catch((err) => console.log(err));
//   }
//   static deleteById(prodId) {
//     const DB = getDb();
//     return DB.collection("products")
//       .deleteOne({ _id: new monggo.ObjectId(prodId) })
//       .then((Products) => {
//         console.log("delete ok");
//       })
//       .catch((err) => console.log(err));
//   }
// }

// // const Sequelize = require("sequelize");
// // const sequelize = require("../util/database");
// // const Product = sequelize.define("product", {
// //   id: {
// //     type: Sequelize.INTEGER,
// //     autoIncrement: true,
// //     allowNull: false,
// //     primaryKey: true,
// //   },
// //   title: Sequelize.STRING,
// //   price: {
// //     type: Sequelize.DOUBLE,
// //     allowNull: false,
// //   },
// //   imageUrl: {
// //     type: Sequelize.STRING,
// //     allowNull: false,
// //   },
// //   description: {
// //     type: Sequelize.STRING,
// //     allowNull: false,
// //   },
// // });
module.exports = mongoose.model("Product", ProductSchema);
