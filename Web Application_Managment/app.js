var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homePageRouter = require('./routes/homePage');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/', homePageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//socket io (with python)
const socket = require('socket.io');
const http = require('http');
const server = http.createServer(app);
var socketio = require('socket.io');

server.listen(3010, function(){
  console.log('Server running at http://localhost:3010')
});

var io = socketio.listen(server);
var clients = [];
io.sockets.on('connection', function(socket){

    socket.on('clientMessage', function(data){
      console.log('Client_SocketID : ' + socket.id + ', Connect');
      
      var clientInfo = new Object();
      clientInfo.id = socket.id;
      clientInfo.uid = data.uid;
      clients.push(clientInfo);
      
      console.log('clientMessage : ' + data.uid)
    });
  
    socket.on('hompageMessage', function(data2){

      for(var i = 0; i < clients.length; i++){
        if( data2 == "Occur"){
          var msg = {
            data : 'data',
            size : 'big'
          } 
          var client = clients[i];
          console.log('client.uid = ' + client.uid);
          console.log('hompageMessage : ' + data2);
          io.to(client.uid).emit('serverMessage',msg);  
        }
        else{
          var msg2 = {
            data : 'data',
            size : 'small'
          }
          io.sockets.socket(client.uid).send('serverMessage',msg2);
        }
      }
    });
});

module.exports = app;
