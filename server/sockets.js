//set up socket connection

module.exports = function(io) {
  io.on('connection', function (socket) {
    console.log('connected user!');
  });
};