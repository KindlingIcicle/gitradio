/*==========================
SOUND INIT - BufferLoader model?
==========================*/
// for loading audio data - pass in the object to attach sounds to
var loadSounds = function (obj, soundMap, callback) {
  // Array-ify
  var names = [];
  var paths = [];

  //pushes sounds into arrays
  for (var name in soundMap) {
    var path = soundMap[name];
    names.push(name);
    paths.push(path);
  }

  //creates a new bufferLoader
  bufferLoader = new BufferLoader(context, paths, function(bufferList) {
    for (var i = 0; i < bufferList.length; i++) {
      var buffer = bufferList[i];
      var name = names[i];
      obj[name] = buffer;
    }
    //perform callback
    if (callback) {
      callback();
    }
  });
  bufferLoader.load();
};

var playSound = function (buffer, time) {
  var source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(time);
};

var BufferLoader = function (context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = [];
  this.loadCount = 0;
};

//loadBuffer method - makes AJAX request for audio file
BufferLoader.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  //explicitly declaring 'this' keyword binding for onload
  var loader = this;

// Asynchronously decode the audio file data in request.response
  request.onload = function() {
    //decode PCM/binary
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }

        loader.bufferList[index] = buffer;
        if (++loader.loadCount === loader.urlList.length)
          loader.onload(loader.bufferList);
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  };

//error function
  request.onerror = function() {
    alert('BufferLoader: XHR error');
  };

//send off request
  request.send();
};

//load function
BufferLoader.prototype.load = function () {
  for (var i = 0; i < this.urlList.length; i++)
  this.loadBuffer(this.urlList[i], i);
};
