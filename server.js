/* jshint esversion: 6 */

const net = require('net');

const clients = [];
const changeUsername = [];
const chatLog = [];

const userMenu = `[ USER MENU ]
  @ : Change Username : '@sample'
  * : Send Direct Msg To User : '#Username Message'
`;

const adminMenu = `[ ADMIN MENU ]
  ! : Kick User : '!Username'
`;


const server = net.createServer((connection) => {
  server.userName = '[ADMIN]';
  connection.userName = `User #${clients.length}`;
  clients.push(connection);

  connection.write(`*** Welcome To The Chatroom *** \n ${userMenu}`);

  connection.on('data', (chunk) => {
    console.log(`Msg from ${connection.userName}: ${chunk}`);

    switch(chunk.toString().charAt(0)) {
      case '@':
      clients.forEach( (element) => {
        if (element === connection) {
          changeUsername.push(`${connection.userName}: ${chunk.toString()}`);
          connection.userName = chunk.toString().slice(1, chunk.length -1);
        }
      });
      break;
      default:
      clients.forEach( (element) => {
        element.write(`${connection.userName}: ${chunk}`);
        });
      }// end switch statement
    });

}); // createServer ends

process.stdin.on('data', (chunk) => {
  switch (chunk.toString().charAt(0)) {
    case '!' :
    clients.filter( (element) => {
      return element.userName === chunk.toString().slice(1, -1);
    })
    .forEach( (element) => {
      clients.splice(clients.indexOf(element, 1));
      element.end(`${server.userName}: You have been kicked!`);
    });
    break;

    default:
    clients.forEach( (client) => {
      client.write(`${server.userName}: ${chunk}`);
    });
  } // end switch statement
});

// listening to client
server.listen(6969, '0.0.0.0', () => {
  console.log(`Server listening on port 6969 \n ${adminMenu}`);
});