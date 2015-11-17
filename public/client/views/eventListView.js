var eventListView  = Backbone.View.extend({

  //instantiate each entry view here
  tagName : 'ul',

  initialize : function () {
    //initially render any data, mostly the demo data.
    this.render();

    //add event listener to whenever a new event is added.
    this.listenTo(this.collection, 'add', function(){
      this.addNewEvent();
    });
  },

  render : function(){
    //go though all the existing events(for now, they are mostly useful for existing demo events)
    //and render each event's view and append them to the ul tag in reverse order;
    var renderedEvents =this.collection.map(function(eventModel){
      return new eventEntryView({model : eventModel}).$el;
    });

    this.$el.append(renderedEvents.reverse());
    return this.$el;
  },

  //new event is added by first having it rendered in the eventEntryVeiw
  //then prepend it to the only ul element on the page.
  //it will also be animated by first hiding it then sliding it down.
  addNewEvent : function(){
    var newEventModel = this.collection.last();
    var newEntryView = new eventEntryView({model : newEventModel});
    this.$el.prepend(newEntryView.$el);
    newEntryView.$el.hide();
    newEntryView.$el.slideDown(400);
  }

});
