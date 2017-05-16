import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import router from './router';
import runMongoose from './mongoose';
import WebSocketServer from 'ws';

var clients = {};
var webSocketServer = new WebSocketServer.Server({
  port: 9001
});
webSocketServer.on('connection', function(ws) {
  var id = Math.random();
  clients[id] = ws;
  console.log("New connection " + id);
  ws.on('message', function(message) {
    console.log('Received message ' + message);
    for (var key in clients) {
      clients[key].send(message);
    }
  });
  ws.on('close', function() {
    console.log('Connection closed ' + id);
    delete clients[id];
  });
});

dotenv.config();

const app = express();

runMongoose(app);

//middleware
app.use(bodyParser.json({ strict: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// setting static folder
app.use(express.static(path.join(__dirname, '/../build')));
app.use(express.static(path.join(__dirname, 'uploads')));

// router
router(app);

// app.set('port', (process.env.PORT || 5000));
app.set('port', 9000);
app.listen(app.get('port'), () => console.log(`App is listening on port ${app.get('port')}`));
