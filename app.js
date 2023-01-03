const path = require("path");

const express = require("express");

const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: "*",
  methods: "GET,POST",
  preflightContinue: false,
  optionsSuccessStatus: 200,
};
app.use(cors({ corsOptions }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(bodyParser.raw({ type: "text/plain" }));
const errorController = require("./Controller/error");
const adminRoutes = require("./Routers/admin");
const shopRoutes = require("./Routers/shop");
const { use } = require("./Routers/admin");
// app.use(express.static(path.join(__dirname, "public")));
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

app.listen(5000, console.log("đang chạy"));
