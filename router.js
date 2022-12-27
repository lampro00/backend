const resHandler = (req, res) => {
  const url = req.url;

  if (url === "/users") {
    res.getHeader("Content-Header", "text/html");
    res.write("<html>");
    res.write(" <body><ul><li>Use 1</li><li>Use </li></ul></body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/create-user") {
    const body = [];
    res.on("data", (chunk) => {
      body.push(chunk);
    });
    res.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      console.log(parseBody.split("=")[1]);
    });

    res.statusCode = 302;
    res.setHeader("Location", "/");
    res.end();
  }
};
module.exports = resHandler;
