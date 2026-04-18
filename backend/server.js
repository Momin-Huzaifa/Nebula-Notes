const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Set the port assigned by Render, or default to 10000 locally
const port = process.env.PORT || 10000;

server.use(middlewares);

// Add custom routes or delay if needed
server.use(jsonServer.rewriter({
  "/api/*": "/$1"
}));

server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
