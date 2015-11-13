// TODO - Refactor to Backbone.js
var context;
var bufferLoader;
context = new AudioContext();
var loaded = [];
//play sound

var playSound = function (buffer) {
  var source = context.createBufferSource();
  source.buffer = buffer;
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
    '../assets/pull-request.wav',
    '../assets/watch.wav',
    '../assets/fork.wav'
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

var doNothing = function (bufferList) {
  console.log('yep. loaded.');
  console.log(bufferList);
  loaded = bufferList;
};

var loopHandler = function(e) {
  loopSound(background);
  socket.emit('looping');
};

//click event listener
// var looper = document.getElementById('loop');
// looper.addEventListener('click', loopHandler);

window.onload = loadSounds;
