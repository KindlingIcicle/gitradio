// TODO - Refactor to Backbone.js
var context;
var bufferLoader;
context = new AudioContext();
var sound;
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
    '../assets/sample.wav'
    ],
    doNothing
    );

  bufferLoader.load();
};

var loopSound = function (bufferList) {
  var source = context.createBufferSource();
  source.buffer = bufferList[0];

  source.connect(context.destination);
  source.loop = true;
  source.start(0);
};

var doNothing = function () {
  console.log('yep.');
};

var clickHandler = function(e) {
  playSound(sound);
};

//click event listener
var clicker = document.getElementById('click');
click.addEventListener('click', clickHandler);


window.onload = loadSounds;
