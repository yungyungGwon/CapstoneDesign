var express = require('express');
var app = express();
var http = require('http');
var socketio = require('socket.io');

var server = http.createServer(function(req, res){

}).listen(2020, function(){
    console.log('Server running at http://localhost:2020');
});

var io = socketio.listen(server);

io.sockets.on('connection', function(socket){
    console.log('SocketID : ' + socket.id + ', Connect');
    socket.on('clientMessage', function(data){
        console.log('ClientMessage : ' + data.fire + ', ' + data.scale);
        socket.emit('serverMessage', '1');
    });
});