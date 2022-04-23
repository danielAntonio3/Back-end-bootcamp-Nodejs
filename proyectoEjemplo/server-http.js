const http = require('http');
const server = http.createServer();

const { ENV, PORT } = require('./config');

// ? La forma en que NodeJS trabajo el backend (por medio de eventos)
server.on('request', (request, response) => {
  if (request.method === 'POST' && request.url === '/datos') {
    // TODO: Regresar al momento de ver Streams
  }

  response.statusCode = 200;
  response.end('Hola mundo');
});

server.listen(PORT, () => {
  console.log(
    `Servidor corriendo en ${ENV} en el puerto http://localhost:${PORT}`
  );
});
