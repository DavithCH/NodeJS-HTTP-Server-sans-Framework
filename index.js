const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  try {
    if (req.url === "/") {
      if (req.method !== "GET") {
        res.writeHead(401, { "Content-Type": "text/plain" });
        // res.write("<h1>404 Méthode non autorisée</h1>");
        const htmlFile = fs.readFileSync("./public/page_401.html");
        res.write(htmlFile);
        res.end();
      } else {
        res.writeHead(200, { "content-type": "text/html" });
        // res.write("<h1>HELLO WORLD DAVITH CHHUNG</h1>");
        const htmlFile = fs.readFileSync("./public/index.html");
        res.write(htmlFile);
        res.end();
      }
    } else if (req.url === "/public/images/image.jpg") {
      try {
        const imageFile = fs.readFileSync("./public/images/image.jpg");
        res.writeHead(200, { "Content-Type": "image/jpeg" });
        res.write(imageFile);
        res.end();
      } catch (err) {
        console.log(err);
        res.end();
      }
    } else {
      res.writeHead(404, { "content-type": "text/html" });
      // res.write("<h1>404 Page introuvable</h1>");
      const htmlFile = fs.readFileSync("./public/page_404.html");
      res.write(htmlFile);
      res.end();
    }
  } catch (err) {
    console.log(err);
    res.end();
  }
});
server.listen(5000);
