const http = require("http");
const server = http.createServer((req, res) => {
  try {
    if (req.url === "/") {
      if (req.method !== "GET") {
        res.writeHead(401, { "Content-Type": "text/plain" });
        res.write("<h1>404 Méthode non autorisée</h1>");
        res.end();
      } else {
        res.writeHead(200, { "content-type": "text/html" });
        res.write("<h1>HELLO WORLD DAVITH CHHUNG</h1>");
        res.end();
      }
    } else {
      res.writeHead(404, { "content-type": "text/html" });
      res.write("<h1>404 Page introuvable</h1>");
      res.end();
    }
  } catch (err) {
    console.log(err);
    res.end();
  }
});
server.listen(5000);
