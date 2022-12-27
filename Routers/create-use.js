const express = require("express");
const router = express.Router();

router.post("/create-user", (req, res, next) => {
  console.log(req.body);
  // const body = [];
  // res.on("data", (chunk) => {
  //   body.push(chunk);
  // });
  // res.on("end", () => {
  //   const parseBody = Buffer.concat(body).toString();
  //   console.log(parseBody.split("=")[1]);
  // });

  // res.statusCode = 302;
  // res.setHeader("Location", "/");
});
module.exports = router;
