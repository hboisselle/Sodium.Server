const WebSocket = require('ws');
const wss = new WebSocket.Server({port: 8080});

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', function connection(ws) {
  console.log("connexion!!")
ws.on('error', () => console.log('errored'));
  
  ws.on('message', function incoming(data) {
    // Broadcast to everyone else.
	console.log("incoming data:\n" + data)
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

wss.on('error', () => console.log('errored'));