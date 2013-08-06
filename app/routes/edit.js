import send from 'app/utils/send';

var EditRoute = Ember.Route.extend({
  activate: function(){
    this.controllerFor('cardMetadata').set('isEditing', true);
  },
  deactivate: function(){
    this.controllerFor('cardMetadata').set('isEditing', false);
  },
  setupController: function(controller, model) {
    controller.set('title', this.controllerFor('application').get('title'));
  },
  adminStorageConsumer: function() {
    return this.container.lookup('consumer:adminStorage');
  }.property(),
  events: {
    renderDefault: send('doneEditing'),
    doneEditing: function() {
      this.transitionTo('index');
    },
    saveTitle: function() {
      var title = this.controller.get('title');
      this.controllerFor('application').set('title', title);
      this.get('adminStorageConsumer').request('setItem', 'title', title);
    }
  }
});

export default EditRoute;
