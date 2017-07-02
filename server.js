/* jshint esversion: 6 */

const net = require('net');

const clients = [];

const server = net.createServer((connection) => {
  connection.pipe(connection);
  connection.on('data', (chunk) => {
    console.log(`Server From Client: ${chunk}`);

  // Identify the client
  connection.name = connection.remoteAddress + ":" + connection.remotePort;
  });

  clients.push(connection);

  connection.on('data', (chunk, sender) => {
    clients.forEach( (client) => {
      if (client === sender) {
        return;
      } else {
        client.write(chunk);
      }
    });
  });

});


// listening to client
server.listen(6969, '0.0.0.0', () => {
  console.log('Server listening on port 6969');
});

//based on events server should relay to multiple clients

// 59894