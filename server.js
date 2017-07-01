/* jshint esversion: 6 */

const net = require('net');

const server = net.createServer((connection) => {
  connection.write('Echo server\n');
  connection.pipe(connection);
  connection.on('data', (data) => {
});
});

// listening to client
server.listen({port: 6969, host: '0.0.0.0'}, () => {
  console.log('Server listening on port 6969');
});
