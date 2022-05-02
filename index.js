const http = require("http");
const server = http.createServer((req, res) => {
  console.log("HELLO WORLD DAVITH");
  res.end();
});
server.listen(5000);
