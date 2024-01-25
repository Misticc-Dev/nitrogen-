import express from "express";
import { createServer } from "node:http";
import path from "node:path";
import { createBareServer } from "@tomphttp/bare-server-node";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";


const __dirname = process.cwd();
const server = createServer();
const app = express(server);
const bareServer = createBareServer("/bare/");

createBareServer("/bare/");

app.use("/uv/", express.static(uvPath));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, "static")));

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), './static/index.html'));
});


server.on("request", (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
    console.log(`success`);
  } else {
    app(req, res);  
    console.log(`fail`);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

server.on("listening", () => {
  console.log(`port 8080`);
});

server.listen({
  port: 8080,
});