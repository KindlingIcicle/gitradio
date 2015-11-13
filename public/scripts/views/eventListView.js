var eventListView  = Backbone.View.extend({

//instantiate each entry view here
  tagName : 'ul',

  initialize : function () {
    this.render();
    this.listenTo(this.collection, 'add', function(){
      this.newEventNotifier();
    });
  },

  render : function(){
    var renderedEvents =this.collection.map(function(eventModel){
      return new eventEntryView({model : eventModel}).$el;
    });

    this.$el.append(renderedEvents.reverse());
    return this.$el;
  },

  newEventNotifier : function(){
    var newEventModel = this.collection.last();
    var newEntryView = new eventEntryView({model : newEventModel});
    this.$el.prepend(newEntryView.$el);
  }

});
