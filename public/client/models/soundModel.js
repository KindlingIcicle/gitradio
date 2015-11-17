var soundModel = Backbone.Model.extend({
  initialize: function(params) {
    //set soundLibrary (directory name in assets) to default
    this.set('soundLibrary', 'default');
   
   //initialize new Audio Context
    this.set('context', function() {
      return new AudioContext();
    }());

  //cache of sounds to be played by browser
    this.set('loaded', {});

    //set data to the data passed into soundModel
    this.set('data', params.data);

    //load currentLibrary
    this.loadLibrary(this.get('soundLibrary'));
  },

  //should be changed to toggle
  changeLib : function () {
    var newLibrary = this.get('soundLibrary') === 'default' ? 'allen' : 'default';
    this.set('soundLibrary', newLibrary);
  },

  bufferLoader: null,

 //LOAD THE CURRENT LIBRARY
  loadLibrary : function (lib) {
    var context = this.get('context');
    var data = this.get('data');
    this.loadSounds(context, data, lib);
  },

//Function to load sounds - takes audio context, a soundMap object (data) and the library
  loadSounds: function (context, soundMap, lib) {
  
    var names = [];
    var paths = [];

    for (var name in soundMap) {
      var path = soundMap[name].path;
      var event = soundMap[name].event;
      names.push(name);
      paths.push(path + lib + event);
    }


   var context = this.get('context');

   var storeSounds = this.storeSounds.bind(this);

    this.set('bufferLoader', function(context, paths, callback) {
      return new BufferLoader(
      context,
      paths,
      storeSounds
      );
    }(context, paths, storeSounds), this);

    this.get('bufferLoader').load();
  },

  storeSounds : function (bufferList) {
    console.log(this);
    this.set('loaded', {
      'pull_request' : bufferList[0],
      'fork' : bufferList[1],
      'watch' : bufferList[2],
      'default' : bufferList[3]
    });
  },

  playSound : function (buffer) {
    var source = this.get('context').createBufferSource();
    source.buffer = buffer;
    source.connect(this.get('context').destination);
    source.start(0);
  }

});