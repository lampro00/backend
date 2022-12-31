const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./Controller/error");

const app = express();

const adminRoutes = require("./Routers/admin");
const shopRoutes = require("./Routers/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(5000, console.log("đang chạy"));
