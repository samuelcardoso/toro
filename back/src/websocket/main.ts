const WebSocketClient = require('ws');
const ws = new WebSocketClient('ws://sim:8080/quotes');

const redis = require("redis"), redisClient = redis.createClient({host: 'redis'});

redisClient.on("error", (err) => {
    console.error(err);
});

ws.on('open', () => {
    console.debug('Connected');
});

ws.on('message', (data) => {
    const json = JSON.parse(data);
    redisClient.set(Object.keys(json)[0], JSON.stringify(json));
});
