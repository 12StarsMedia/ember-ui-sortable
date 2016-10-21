import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    contentMoved(item, oldIndex, newIndex) {
      console.log(`Content Moved! Item: ${item}, oldIndex: ${oldIndex}, "newIndex: ${newIndex}`);
      const content = this.get('model.sortable');
      content.removeAt(oldIndex);
      content.insertAt(newIndex, item);
      console.log(`Updated content array: ${content}`);
    },

    addElement(item, newIndex){
      console.log(`Element added to content! Item: ${item.text().trim()} newIndex: ${newIndex}`);
      this.get('model.sortable').insertAt(newIndex, item.text().trim());
    }
  }
});
