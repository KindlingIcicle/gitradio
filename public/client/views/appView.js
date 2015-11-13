var appView = Backbone.View.extend({


//should have eventListView instantiated here
  el: '.mainAppView',

  initialize : function () {
    //make eventListView
    this.eventListView = new eventListView({collection : this.model.get("eventList")});
    this.render();
    this.listenTo(this.model, 'all', function(){
      console.log('from app view');
    });
  },

  render : function(){
    this.$el.append(this.eventListView.$el);
    // debugger;
  }

});
