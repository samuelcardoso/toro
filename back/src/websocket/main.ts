const WebSocketClient = require('ws');
const ws = new WebSocketClient('ws://sim:8080/quotes');

ws.on('open', () => {
    console.log('OK!');
});

ws.on('message', (data) => {
    console.log(data);
});
