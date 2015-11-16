var appView = Backbone.View.extend({

  //the appView will be anchored on to the div tag with class 'mainAppView' on the index.html
  el: '.mainAppView',

  initialize : function () {
    //create the eventListView to manage all the events as soon as the appView is instantiated:
    this.eventListView = new eventListView({collection : this.model.get("eventList")});
    this.render();
    var mainAppView = this;
    $('.switchMode').on('click', function(){
      mainAppView.model.audioLibChange();
    });
  },

  render : function(){
    //append the eventListView to the div tag with class = "mainAppView";
    this.$el.append(this.eventListView.$el);
  }

});
