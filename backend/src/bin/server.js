const http = require('http');

const app = require('./app');
const { setupWebsocket } = require('./websocket');

const port = process.env.PORT;
const server = http.Server(app);

setupWebsocket(server);

server.listen(port, () => console.log(`Connected at port: ${port}`));
