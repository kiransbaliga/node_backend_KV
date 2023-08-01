const express = require("express");
const server = express();

server.get("/", (req, res) => {
  console.log(req.url);
  res.status(200).send("Hello World Express");
});

server.listen(3000, () => {
  console.log("server up at http://localhost:3000/");
});

