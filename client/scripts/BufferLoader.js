/*==========================
    BUFFER LOADER CLASS 
==========================*/
// for loading audio data

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
        background = buffer;
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