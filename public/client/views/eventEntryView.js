var eventEntryView  = Backbone.View.extend({
  tagName : 'li',
  template : _.template('<div class = "eventEntry">\
    <img class = "img-circle" src = <%=  data.user_avatar_url %> >\
    <p><a href="<%= data.user_url %>"><b><%= data.user %></b>:</a></p>\
    <p><a class = "eventType" href="<%= data.repo_url %>"><%=data.type%></p></a>\
    <p class ="eventTime" ><%=data.time%></p>\
    </div>'),

  initialize : function(){
    this.render();
  },

  render : function () {
    //should return the $el since it is so versatile
    var dataToDisplay = this.template(this.model.attributes); //{data : event}
    this.$el.append(dataToDisplay);
    return this.$el;
  }

});
