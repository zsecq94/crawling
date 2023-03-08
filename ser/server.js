//server.js
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
var ps = require("python-shell");

app.use(cors()); // cors 미들웨어를 삽입합니다.

server.listen(3001, () => {
  console.log("server is running on 3001");
});

app.get("/crawling", (req, res) => {
  var keyword = req.query.keyword;
  var options = {
    mode: "text",
    pythonPath: "",
    pythonOptions: ["-u"],
    scriptPath: "",
    args: [keyword],
  };
  console.log(options);
  ps.PythonShell.run("./test.py", options)
    .then((results) => {
      const result = JSON.parse(results);
      const title = [];
      const url = [];
      const thumb = [];
      result[0].map((V, index) => {
        title.push(result[0][index]);
        url.push(result[1][index]);
        thumb.push(result[2][index]);
      });
      res.send({
        title: title,
        url: url,
        thumb: thumb,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
