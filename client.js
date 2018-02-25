const net = require('net');

const client = net.connect(6969, '0.0.0.0', () => {
  // writes msg to server
  process.stdin.on('data', chunk => {
    client.write(chunk);
  });

  // receives msg from server
  client.on('data', chunk => {
    console.log(chunk.toString());
  });
});

client.on('error', err => {
  console.log(err);
});