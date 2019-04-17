// // Node does not have WebSockets natively
// let WebSocket = require('websocket').w3cwebsocket;
// let ws = new WebSocket('ws://localhost:8080/socket/websocket');

// console.log(ws);

// ws.onopen = () => ws.send('test');
// ws.onmessage = console.log;
// ws.onerror = console.error;
// ws.onclose = console.log;

let SocketIOClient = require('socket.io-client');

// Creating the socket-client instance will automatically connect to the server.
let socket = SocketIOClient('ws://localhost:8080/socket/websocket');

socket.emit('/hello', 'Bla!');
socket.on('/topic/greetings', (message) => console.log(message));
