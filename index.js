const http = require("http");
const server = http.createServer((req, res) => {
  try {
    if (req.url === "/") {
      res.writeHead(200, { "content-type": "text/html" });
      res.write("<h1>HELLO WORLD DAVITH CHHUNG</h1>");
      res.end();
    }
  } catch (err) {
    console.log(err);
    res.end();
  }
});
server.listen(5000);
