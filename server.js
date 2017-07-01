/* jshint esversion: 6 */

const fs = require('fs');
const net = require('net');

const server = net.createServer( (connection) => {
  console.log('client connected');

});

server.listen({port: 3000}, () => {
  console.log('You are connected.');
});