import WebSocketServer from 'ws';
import { uniqueId } from 'lodash';
import jwt from 'jsonwebtoken';

const webSocketClients = {};
const webSocketServer = new WebSocketServer.Server({
  port: 9001
});
webSocketServer.on('connection', function(ws) {
  const id = uniqueId();
  webSocketClients[id] = ws;
  ws.on('message', function(message) {
    const parts = message.split(' ');
    if(parts[0] === 'Bearer' && parts[1]){
      jwt.verify(parts[1], process.env.JWT_SECRET, (err, decoded) => {
        if(!err){
          this.userId = decoded._id;
        }
      })
    }
  });
  ws.on('close', function() {
    delete webSocketClients[id];
  });
});

export default webSocketClients;
