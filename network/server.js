const http = require('http');
const router = require('./router');

const server = http.createServer((req, res) => {
  router.handleRequest(req, res);
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
