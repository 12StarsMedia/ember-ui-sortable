import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.A([
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
      'Item 5',
      'Item 6'
    ]);
  }
});
