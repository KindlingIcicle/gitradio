var appView = Backbone.View.extend({

  //the appView will be anchored on to the div tag with class 'mainAppView' on the index.html
  el: '.mainAppView',

  //experimental feature: add a form to help user to choose which personally associated repo to listen to
  // formToPickRepo : _.template(
  //   '<form class  = "repoPickForm">\
  //     <input class = "getRepoName"><br>\
  //     <button class = "pickRepoButton">pick repo</button>\
  //   </form>'
  //   ),

  initialize : function () {
    //create the eventListView to manage all the events as soon as the appView is instantiated:
    this.eventListView = new eventListView({collection : this.model.get("eventList")});
    this.render();
  //experimental feature: to send http request to github for picking specific repo to listen to 
  //   var mainAppView = this;
  //   $('.switchMode').on('click', function(){
  //     var button = $(this);
  //     allenModeOn = button.hasClass('allenModeOn');
  //     if (allenModeOn){
  //       button.removeClass('allenModeOn');
  //     } else {
  //       button.addClass('allenModeOn');
  //     }
  //     mainAppView.model.audioLibChange();
  //   });

  //   var jsonObj = {
  //    "name": "web",
  //    "active": true,
  //    "events": [
  //      "watch",
  //      "pull_request"
  //    ],
  //    "config": {
  //      "url": "http://a269aaba.ngrok.io/githubCallbackURL",
  //      "content_type": "json"
  //    }
  //  };

  //   $('.pickRepoButton').on('click', function(event){
  //     event.preventDefault();
  //     var repoName = $('.getRepoName').val();
  //     $.ajax({
  //       url: "https://api.github.com/repos/way0750/"+repoName+"/hooks",
  //       method: 'POST',
  //       data: jsonObj,
  //       success : function(data){
  //         console.log('we got the respond from github:', data);
  //         $('.repoPickForm').hide();
  //       },
  //       error : function(data){
  //         console.log('github not happy');
  //       }
  //     }).done(function(data) {
  //       console.log('got it',data);
  //     });
  //   });
  },

  render : function(){
    //experimental feature: to display the form for user to enter which repo to listen to.
    // this.$el.append(this.formToPickRepo());

    //append the eventListView to the div tag with class = "mainAppView";
    this.$el.append(this.eventListView.$el);
  }

});
