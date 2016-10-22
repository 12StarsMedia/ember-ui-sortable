import Ember from 'ember';

export default Ember.Controller.extend({

  draggableList: Ember.A(['🔥 Fire!', '🇨🇦 Canada!', '👻 Ooooohhh!!!', '💩 Aww crap!', '👊 Fist bump', '💋 Smooch']),
  draggableItem: '♥️ Be still by beating heart',
  connectedListOne: Ember.A(['🐲 Plant', '🌵 Cactus', '🍀 Four-leaf clover', '🍃 Leaves', '🌳 Coniferous', '🌴 Palm tree']),
  connectedListTwo: Ember.A(['🍏 Green apple', '🍎 Red apple', '🍐 Pear', '🍊 Orange', '🍋 Lemon', '🍌 Banana']),

  actions: {
    draggableMoved(item, oldIndex, newIndex) {
      console.log(`Content Moved! Item: ${item}, oldIndex: ${oldIndex}, "newIndex: ${newIndex}`);
      const content = this.get('draggableList');
      content.removeAt(oldIndex);
      content.insertAt(newIndex, item);
      console.log(`Updated content array: ${content}`);
    },

    addToDraggableList(item, newIndex){
      console.log(`Element added to content! Item: ${item.text().trim()} newIndex: ${newIndex}`);
      this.get('draggableList').insertAt(newIndex, item.text().trim());
      this.set('draggableItem', null);
    },

    contentMovedToOne(item, oldIndex, newIndex) {
      console.log(`Content Moved! Item: ${item}, oldIndex: ${oldIndex}, "newIndex: ${newIndex}`);
      const contentOne = this.get('connectedListOne');
      const contentTwo = this.get('connectedListTwo');
      contentOne.removeObject(item);
      contentTwo.removeObject(item);
      contentOne.insertAt(newIndex, item);
      console.log(`Updated content arrays: ${contentOne} & ${contentTwo}`);
    },

    contentMovedToTwo(item, oldIndex, newIndex) {
      console.log(`Content Moved! Item: ${item}, oldIndex: ${oldIndex}, "newIndex: ${newIndex}`);
      const contentOne = this.get('connectedListOne');
      const contentTwo = this.get('connectedListTwo');
      contentOne.removeObject(item);
      contentTwo.removeObject(item);
      contentTwo.insertAt(newIndex, item);
      console.log(`Updated content arrays: ${contentOne} & ${contentTwo}`);
    }
  }
});
