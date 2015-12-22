var SoundModel = Backbone.Model.extend({

  initialize: function(params) {
    //sets soundLibrary (directory name in assets) to default
    this.set('soundLibrary', 'default');

    //initializes new AudioContext for Web Audio API
    this.set('context', function() {
      return new AudioContext();
    }());

   //initializes object to be accessed by playSound
    this.set('loaded', {});

   //sets data to data passed into soundModel
    this.set('data', params.data);

    //loads current library
    this.loadLibrary(this.get('soundLibrary'));
  },

//initializes bufferLoader to be used by loadSounds
  bufferLoader: null,

//Function to toggle between sound libraries - TODO: ability to switch between more than two
  toggleLib : function () {
    if (this.get('soundLibrary') === 'default') {
      this.set('soundLibrary', 'allen');
    } else {
      this.set('soundLibrary', 'default');
    }
  },


 //Load the current library - calls loadSounds
  loadLibrary : function (lib) {
    var context = this.get('context');
    var data = this.get('data');
    this.loadSounds(context, data, lib);
  },

//Loads sounds - takes audio context, a soundMap and a library (points to dirname in assets)
  loadSounds: function (context, soundMap, lib) {
  //initializes names and paths - TODO: use names to assign in storeSounds
    var names = [];
    var paths = [];

  //pushes all paths from soundMap to paths
    for (var name in soundMap) {
      var path = soundMap[name].path;
      var event = soundMap[name].event;
      names.push(name);
      //puts together path for the proper asset directory and asset file
      paths.push(path + lib + event);
    }

  //store AudioContext to be used inside Buffer Loader
   var context = this.get('context');

  //bind storeSounds function to this instance of songModel
   var storeSounds = this.storeSounds.bind(this);

  //sets bufferLoader to a newly instantiated Buffer Loader
    this.set('bufferLoader', function(context, paths, callback) {
      return new BufferLoader(
      context,
      paths,
      storeSounds
      );
    }(context, paths, storeSounds));

  //load
    this.get('bufferLoader').load();
  },

  //stores sound in model's loaded object - TODO: refactor to use names in loadSounds somehow
  storeSounds : function (bufferList) {
    this.set('loaded', {
      'pull_request' : bufferList[0],
      'fork' : bufferList[1],
      'watch' : bufferList[2],
      'default' : bufferList[3],
      'gollum' : bufferList[4]
    });
  },

  //plays the sound requested - TODO: disconnect all nodes upon library reinstantiation
  playSound : function (buffer) {
    var source = this.get('context').createBufferSource();
    source.buffer = buffer;
    source.connect(this.get('context').destination);
    source.start(0);
  },

  //not used - Just in case wanna play a looping sound. TODO: refactor to only use playSound with a boolean param
  loopSound : function (buffer) {
    var source = context.createBufferSource();
    source.buffer = buffer;

    source.connect(context.destination);
    source.loop = true;
    source.start(0);
  }

});
