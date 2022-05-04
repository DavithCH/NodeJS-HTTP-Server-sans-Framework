const http = require("http");
const fs = require("fs");
const db = require("./db");

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
    } else if (req.url === "/api/names") {
      if (req.method === "GET") {
        const objDB = Object.fromEntries(db.memoryDb);
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(objDB));
      } else if (req.method === "POST") {
        let currentId = db.memoryDb.size;
        let data = "";
        res.setHeader("content-type", "application/json");
        req.on("data", (chunk) => {
          data += chunk;
        });
        req.on("end", () => {
          data = JSON.parse(data);
          db.memoryDb.set(currentId++, data);
          res.writeHead(201, { "content-type": "text/html" });
          res.end("Successfully added");
        });
      }
    } else if (req.url.includes("/api/name/")) {
      let id = Number(req.url.split("/")[3]);
      let objDB = JSON.stringify(db.memoryDb.get(id));
      if (!db.memoryDb.has(id)) {
        res.writeHead(404, { "content-type": "text/html" });
        const htmlFile = fs.readFileSync("./public/page_404.html");
        res.write(htmlFile);
        res.end();
      }
      if (req.method === "GET" && db.memoryDb.has(id)) {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(objDB);
      } else if (req.method === "DELETE" && db.memoryDb.has(id)) {
        db.memoryDb.delete(id);
        res.writeHead(200, { "content-type": "text/html" });
        res.end("Successfully deleted object with id : " + id);
        console.log(db.memoryDb);
      } else if (req.method === "PUT" && db.memoryDb.has(id)) {
        let data = "";
        res.setHeader("content-type", "application/json");
        req.on("data", (chunk) => {
          data += chunk;
        });
        req.on("end", () => {
          data = JSON.parse(data);
          db.memoryDb.set(id, data);
          res.writeHead(200, { "content-type": "text/html" });
          res.end("Successfully updated object with id : " + id);
          res.end();
        });
      }
    } else {
      res.writeHead(404, { "content-type": "text/html" });
      const htmlFile = fs.readFileSync("./public/page_404.html");
      res.write(htmlFile);
      res.end();
    }
  } catch (err) {
    res.writeHead(500, { "content-type": "text/html" });
    res.end("500 Erreur Interne au Serveur </h1>");
  }
});

module.exports = server;
