/*jshint esversion: 6*/
const net = require('net');

const server = require('./server.js');

var client = new net.Socket();
client.connect({port: 6969, host: '0.0.0.0'}, () => {
  console.log('new connection');
  client.write('Hello server!');
});

client.on('data', (data) => {
  console.log(`Received:  ${data}`);
});

client.on('close', () => {
  console.log('Connection closed');
});
