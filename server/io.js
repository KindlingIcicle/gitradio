// TO ROUTE
var io = require('../app');

io.on('connection', function(socket){
  console.log('connected user!');
  socket.on('looping', function() {
    console.log('Server heard it!');
    io.emit('looping');
  });

});
