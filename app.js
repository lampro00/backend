const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
// const mongoConnect = require("./util/database").mongoConnect;
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const { userInfo } = require("os");
const { use } = require("./routes/admin");
const User = require("./models/users");
const users = require("./models/users");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((rep, res, next) => {
  User.findById("63e5119568906e61c9fcf1bf")
    .then((user) => {
      (rep.user = user), next();
    })
    .catch((err) => console.log(err));
});
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);
mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://lampro00:anhtapro11@cluster0.wrrut84.mongodb.net/shop2?retryWrites=true&w=majority"
  )
  .then((s) => {
    User.findOne().then((result) => {
      if (!result) {
        const user = new User({
          user: "lamrpo00",
          email: "@a",
          cart: { items: [] },
        });
        user.save();
      }
    });
    app.listen(5000);
    console.log("ok");
  })
  .catch((err) => console.log(err));
