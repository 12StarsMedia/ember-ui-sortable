import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    contentMoved(item, oldIndex, newIndex) {
      console.log('Content Moved! Item: ', item, "oldIndex: ", oldIndex, "newIndex: ", newIndex );
    },

    addElement(item, newIndex){
      console.log('Element added to content! Item: ', item, "newIndex: ", newIndex );
      this.get('model.draggable').insertAt(newIndex, 'Draggable Item');
    }
  }
});
