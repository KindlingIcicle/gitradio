var app = Backbone.Model.extend({

  initialize : function(params){

//connect sockets on initialize
    var socket = io();

//binds addNewEvent function to be called form within socket listener
    var newEvent = this.addNewEvent.bind(this);
    socket.on('event', function(event) {
      console.log(event);
  //Plays the approprite sound if assigned/available - if not, plays the default sound
      var lib = params.library.get('loaded');
        if (lib[event.type]) {
          params.library.playSound(lib[event.type]);
        } else {
          //play default
          params.library.playSound(lib['default']);
        }
      
//Updates the visual feed
      newEvent({data:event});
    });
   
//Listens for change to soundLibrary and reloads Library when changed
   params.library.on('change:soundLibrary', function(data) {
     params.library.loadLibrary(data.get('soundLibrary'));
   }, this);

  },

  addNewEvent : function (gitEvent) {
    var newEvent = new eventModel(gitEvent);
    this.get('eventList').push(newEvent);
  }

});
