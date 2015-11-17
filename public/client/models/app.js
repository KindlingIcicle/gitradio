var app = Backbone.Model.extend({
  //for now the app model is only a container for the eventCollection
  
//to receive data and pushing data to the eventCollection
  initialize : function(params){

//connect sockets on initialize
    var socket = io();

//binds addNewEvent function to be called form within socket listener
    var newEvent = this.addNewEvent.bind(this);

    socket.on('event', function(event) {

//if the appropriate sound for the event is available, play it
    var lib = params.library.get('loaded');
      if (lib[event.type]) {
        params.library.playSound(lib[event.type]);
      } else {
        //play default
        params.library.playSound(lib['default']);
      }
      
//update the feed
      newEvent({data:event});
    });
   
//listening for change to soundLibrary
   params.library.on('change:soundLibrary', function(data) {
     params.library.loadLibrary(data.get('soundLibrary'));
   }, this);

  },

  addNewEvent : function (gitEvent) {
    var newEvent = new eventModel(gitEvent);
    this.get('eventList').push(newEvent);
  }

});
