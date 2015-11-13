var app = Backbone.Model.extend({

//sock io might be connected here
//to receive data and pushing data to the eventCollection
//
  initialize : function(){
  },

  addNewEvent : function (gitEvent) {
    var newEvent = new eventModel(gitEvent);
    this.get('eventList').push(newEvent);
  }

});
