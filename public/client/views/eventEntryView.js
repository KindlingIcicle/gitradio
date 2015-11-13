var eventEntryView  = Backbone.View.extend({
  tagName : 'li',
  template : _.template('<div>new event: <%= data%></div>'),

  initialize : function(){
    this.render();
  },

  render : function () {
    //should return the $el since it is so versatile
    var dataToDisplay = this.template(this.model.attributes);
    this.$el.append(dataToDisplay);
    return this.$el;
  }

});
