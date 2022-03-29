const http = require("http");
const app = require("./app");
const server = http.createServer(app);

const API_PORT = 4000;
const port = process.env.PORT || API_PORT;

console.log("Server is running on port", port);
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
