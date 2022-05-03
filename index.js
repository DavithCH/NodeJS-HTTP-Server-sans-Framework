const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  try {
    if (req.url === "/") {
      if (req.method !== "GET") {
        res.writeHead(401, { "Content-Type": "text/plain" });
        const htmlFile = fs.readFileSync("./public/page_401.html");
        res.write(htmlFile);
        res.end();
      } else {
        res.writeHead(200, { "content-type": "text/html" });
        const htmlFile = fs.readFileSync("./public/index.html");
        res.write(htmlFile);
        res.end();
      }
    } else if (req.url.includes("/public/")) {
      let mimeType = req.url.split("/")[2];
      let fileName = req.url.split("/")[3].split(".")[0];
      try {
        const file = fs.readFileSync(
          `./public/${mimeType}/${fileName}.${mimeType}`
        );
        if (mimeType === "jpg") {
          res.writeHead(200, { "Content-Type": "image/jpeg" });
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
        }
        res.write(file);
        res.end();
      } catch (err) {
        console.log(err);
        res.end();
      }
    } else if (req.method === "POST" && req.url !== "/") {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", () => {
        data = JSON.parse(data);
        res.end();
      });
    } else {
      res.writeHead(404, { "content-type": "text/html" });
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
