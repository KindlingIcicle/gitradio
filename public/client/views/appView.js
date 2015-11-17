var appView = Backbone.View.extend({

  //the appView will be anchored on to the div tag with class 'mainAppView' on the index.html
  el: '.mainAppView',

  formToPickRepo : _.template(
    '<form>\
      <input class = "getRepoName"><br>\
      <button class = "pickRepoButton">pick repo</button>\
    </form>'
    ),

  initialize : function () {
    //create the eventListView to manage all the events as soon as the appView is instantiated:
    this.eventListView = new eventListView({collection : this.model.get("eventList")});
    this.render();
    var mainAppView = this;

   //toggle library when clicked
    $('.switchMode').on('click', function(){
      mainAppView.model.get('library').changeLib();
    });

    var jsonObj = {
     "name": "web",
     "active": true,
     "events": [
       "watch",
       "pull_request"
     ],
     "config": {
       "url": "http://a269aaba.ngrok.io/githubCallbackURL",
       "content_type": "json"
     }
   };

    $('.pickRepoButton').on('click', function(event){
      event.preventDefault();
      var repoName = $('.getRepoName').val();
      console.log(repoName);
      $.ajax({
        url: "https://api.github.com/repos/way0750/"+repoName+"/hooks",
        method: 'POST',
        data: jsonObj,
        success : function(data){
          console.log('we got the respond from github:', data);
        },
        error : function(data){
          console.log('github not happy');
        }
      }).done(function(data) {
        console.log('got it',data);
      });
    });
  },

  render : function(){
    //initially there isn't any data to render, so render an input form for user to pick which
    //repo to choose to listen to:
    this.$el.append(this.formToPickRepo());
    //append the eventListView to the div tag with class = "mainAppView";
    this.$el.append(this.eventListView.$el);
  }

});
