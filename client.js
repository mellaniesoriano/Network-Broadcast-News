/*jshint esversion: 6*/
const net = require('net');

const server = require('./server.js');

// connect client to server
const client = net.connect({port: 6969, host: '0.0.0.0'}, () => {
  console.log('You are now connected');
});
