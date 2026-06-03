import http from "node:http";

const PORT = Number(process.env.PORT) || 3000;

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }

  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("dogfood-tiny-node-api\n");
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("not found\n");
});

if (process.argv[1] && process.argv[1].endsWith("server.js")) {
  server.listen(PORT, () => {
    console.log(`listening on http://127.0.0.1:${PORT}`);
  });
}

export { server, PORT };
