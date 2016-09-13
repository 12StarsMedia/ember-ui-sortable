import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    contentMoved(item, oldIndex, newIndex) {
      console.log('Content Moved! Item: ', item, "oldIndex: ", oldIndex, "newIndex: ", newIndex );
    }
  }
});
