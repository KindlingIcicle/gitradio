var eventEntryView  = Backbone.View.extend({
  tagName : 'li',
  template : _.template('<div class = "eventEntry">\
    <img class = "img-circle" src = <%= user_avatar_url %> >\
    <p class = "userName"><a href="<%= user_url %>"><b><%= user %></b>:</a></p>\
    <p><a class = "eventType" href="<%= repo_url %>"><%= type %></p></a>\
    <p class ="eventTime" ><%= time %></p>\
    </div>'),

  initialize : function(){
    this.render();
  },

  render : function () {
    //this.model refers to a single eventModel
    //right here, a single eventModel's attributes are interpolated into the above template
    //and the attribute looks like this: {data : event}, all github related data are in the data property.
    var eventData = this.model.attributes.data;
    var dataToDisplay = this.template(eventData); 
    this.$el.append(dataToDisplay);
    return this.$el;
  }
});
