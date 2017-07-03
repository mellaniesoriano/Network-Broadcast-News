/* jshint esversion: 6 */

const net = require('net');

const clients = [];
const changeUsername = [];
const userMenu = `
  @ : Change Username : '@sample'
`;


const server = net.createServer((connection) => {
  connection.userName = `User# ${clients.length}`;

  // var testing = changeUsername.push(connection.userName);
  // console.log('changeUserArr..', testing);

  connection.write(`*** Welcome  *** \n Get started with menu : \n ${userMenu}`);

  connection.on('data', (chunk) => {
    data = changeUsername.slice(1, -1);
    console.log(`Server From Client: ${chunk}`);

    switch(chunk.toString().charAt(0)) {
      case '@':
      clients.forEach( (element) => {
        if (element === connection) {
          changeUsername.push(`${connection.userName}: ${chunk.toString()}`);
          connection.userName = chunk.toString().slice(1, chunk.length -1);
        }
      });
      } // end switch statement
    });



  clients.push(connection);

  connection.on('data', (chunk, sender) => {
    clients.forEach( (client) => {
      if (client === sender) {
        return;
      } else {
        client.write(`${connection.userName} : ${chunk}`);
      }
    });
  });

  console.log(clients.length);
}); // createServer ends

// listening to client
server.listen(6969, '0.0.0.0', () => {
  console.log('Server listening on port 6969');
});