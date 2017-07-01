/* jshint esversion: 6 */

const net = require('net');

const server = net.createServer((connection) => {
  console.log('Connection successful');
});
server.on('error', (err) => {
  console.log(err);
});

// listening to client
server.listen({port: 6969, host: '0.0.0.0'}, () => {
  console.log('Server listening on port 6969');
});