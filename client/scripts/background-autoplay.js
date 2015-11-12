// TODO - Refactor to Backbone.js
var context;
var bufferLoader;

//play sound
var playSound = function (buffer, loop) {
  var source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.loop = loop;
  source.start(0);
};
//autoplay
var init = function () {
  context = new AudioContext();

  bufferLoader = new BufferLoader(
    context,
    [
      '../assets/sample.wav'
    ],
    finishedLoading
    );

  bufferLoader.load();
};

var finishedLoading = function (bufferList) {
  // Create two sources and play them both together.
  var source1 = context.createBufferSource();
  source1.buffer = bufferList[0];

  source1.connect(context.destination);
  source1.loop = true;
  source1.start(0);
};

//init everything on windowload
window.onload = init;