// TODO - Refactor to Backbone.js
var context;
var bufferLoader;
context = new AudioContext();
var background;
//play sound

//TODO: fix this
var playSound = function (buffer) {
  var source = context.createBufferSource();
  source.buffer = background;
  source.connect(context.destination);
  source.start(0);
};

//autoplay on pageload
var loadSounds = function (obj, soundMap) {
  // Array-ify
  var names = [];
  var paths = [];
  
  for (var name in soundMap) {
    var path = soundMap[name];
    names.push(name);
    paths.push(path);
  }

  bufferLoader = new BufferLoader(
    context,
    [
    '../assets/sample.wav'
    ],
    doNothing
    );

  bufferLoader.load();
};

var loopSound = function (buffer) {
  var source = context.createBufferSource();
  source.buffer = buffer;

  source.connect(context.destination);
  source.loop = true;
  source.start(0);
};

var doNothing = function () {
  console.log('yep.');
};

var clickHandler = function(e) {
  playSound(background);
};

var loopHandler = function(e) {
  loopSound(background);
  socket.emit('looping');
};

//click event listener
// var looper = document.getElementById('loop');
// looper.addEventListener('click', loopHandler);

window.onload = loadSounds;
