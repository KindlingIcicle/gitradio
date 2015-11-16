var FormView = Backbone.View.extend({

  initialize: function() {

  },

  events: {
    'submit #send': 'handleSubmit'
  },

  handleSubmit: function(e) {
    e.preventDefault();

    this.startSpinner();

    var $text = this.$('#message');
    $text.val('');
  },

});
