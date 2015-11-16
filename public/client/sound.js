// TODO - Refactor to Backbone.js
var context;
var bufferLoader;
context = new AudioContext();
//storing the sounds
var loaded = {};

//play sound
var playSound = function (buffer) {
  var source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(0);
};

//autoplay on pageload
var loadSounds = function (obj, soundMap) {
  // Array-ify if given a soundmap
  var names = [];
  var paths = [];
  
  for (var name in soundMap) {
    var path = soundMap[name];
    names.push(name);
    paths.push(path);
  }

//setting to the main sounds - can be refactored to use soundMap for different sounds
  bufferLoader = new BufferLoader(
    context,
    [
    '../assets/pull-request.wav',
    '../assets/watch.wav',
    '../assets/fork.wav',
    '../assets/pull-denied.wav'
    ],
    storeSounds
    );

  bufferLoader.load();
};

//just-in-case we gonna loop something
var loopSound = function (buffer) {
  var source = context.createBufferSource();
  source.buffer = buffer;

  source.connect(context.destination);
  source.loop = true;
  source.start(0);
};

//stores Sounds in global loaded object
var storeSounds = function (bufferList) {
  loaded['pull_request'] = bufferList[0];
  loaded['watch'] = bufferList[1];
  loaded['fork'] = bufferList[2];
  loaded['pull_denied'] = bufferList[3];
};

window.onload = loadSounds;
