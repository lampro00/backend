const express = require("express");
const app = express();
const bodyParse = require("body-parser");
const adminRouter = require("./Routers/admin");
const useRouter = require("./Routers/use");
const createuserRouter = require("./Routers/create-use");
const path = require("path");
app.use(bodyParse.urlencoded({ extended: false }));
const rootDirname = require("./ulti/path");
app.use(express.static(path.join(__dirname, "public")));
app.use(adminRouter);
app.use(useRouter);
app.use(createuserRouter);
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "View", "404page.html"));
});
app.listen(3000, console.log("sever chạy ở port 3000"));
