const express = require("express");
const app = express();
const bodyParse = require("body-parser");
const adminRouter = require("./Routers/admin");
const shopRouter = require("./Routers/shop");
const path = require("path");
app.use(bodyParse.urlencoded({ extended: false }));
const rootDirname = require("./ulti/path");
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");
app.set("views", "views");
app.use("/admin", adminRouter.routes);
app.use(shopRouter);
app.use((req, res, next) => {
  res.status(404).render("404page", { pageTitle: "Page Not Found" });
});
app.listen(3000, console.log("sever chạy ở port 3000"));
