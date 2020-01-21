const express = require('express');
const logger = require('morgan');

const bluebird = require('bluebird');
const authRoutes = require('./routes');
const database = require('./database');
const http = require('http');
//const socketio = require('socket.io');
/* let server = require('http').Server(app);
let io = require('socket.io')(server); */
//const socketEvents = require('./web/socket'); 
/* const routes = require('./web/routes');  */
//const appConfig = require('./config/app-config'); 
global.Promise = bluebird;

database.connect();

const app = express();

app.use(logger('dev'));


authRoutes(app);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

/* class Server{
 
  constructor(){
      this.app = express();
      this.http = http.Server(this.app);
      this.socket = socketio(this.http);
  }

  appConfig(){        
      new appConfig(this.app).includeConfig();
  }

  /* Including app Routes starts
  includeRoutes(){
      new routes(this.app).routesConfig();
      new socketEvents(this.socket).socketConfig();
  }
  /* Including app Routes ends 

  appExecute(){
      this.appConfig();
      this.includeRoutes();

      const port =  process.env.PORT || 8000;
      const host = process.env.HOST || `localhost`;      

      this.http.listen(port, host, () => {
          console.log(`Listening on http://${host}:${port}`);
      });
  }

}
const app = new Server();
app.appExecute(); */

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3030 });
CLIENTS=[];
wss.getUniqueID = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
};
wss.on('connection', function connection(ws) {
    ws.id = wss.getUniqueID();
    CLIENTS.push(ws.id)
    console.log("===========CLIENTS")
    console.log(  ws.id )
  ws.on('message', function incoming(data) {


    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        console.log(data);
        client.send(data);
      }
    });
  });
})
/* const socketOps = require('./controllers/socketOps')
socketOps.allSocketOps(io) */
app.listen(8000, err => (err ? console.log('Error happened', err) : console.log('Server is up')));

/* io.on('connection', function(socket){

    socket.on('user joined', function(data){
       socket.join(data.username);    
    });
  
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  
    socket.on('send private', function(data){
        console.log('sending private', data);
        io.in(data.to).emit('pmessage',data);
    })
  
  }); */
/* io.on('connection', (socket) => {
  let query = socket.request._query,
      user = {
          username : query.username,
          uid : query.uid,
          socket_id : socket.id
      };

  if(users[user.uid] !== undefined){
      createSocket(user);
      socket.emit('updateUsersList', getUsers());
  }
  else{
      createUser(user);
      io.emit('updateUsersList', getUsers());
  }

  socket.on('message', (data) => {
      socket.broadcast.emit('message', {
          username : data.username,
          message : data.message,
          uid : data.uid
      });
  });

  socket.on('disconnect', () => {
      removeSocket(socket.id);
      io.emit('updateUsersList', getUsers());
  });
});
})
 */
/* removeSocket = (socket_id) => {
    let uid = '';
    Object.keys(users).map(function(key){
        let sockets = users[key].sockets;
        if(sockets.indexOf(socket_id) !== -1){
            uid = key;
        }
    });
    let user = users[uid];
    if(user.sockets.length > 1){
        // Remove socket only
        let index = user.sockets.indexOf(socket_id);
        let updated_user = {
            [uid] : Object.assign(user, {
                sockets : user.sockets.slice(0,index).concat(user.sockets.slice(index+1))
            })
        };
        users = Object.assign(users, updated_user);
    }else{
        // Remove user by key
        let clone_users = Object.assign({}, users);
        delete clone_users[uid];
        users = clone_users;
    }
}; */