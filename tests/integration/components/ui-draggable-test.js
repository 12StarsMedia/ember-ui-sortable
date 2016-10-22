import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

var draggablePerson;
var people;

moduleForComponent('ui-draggable', 'Integration | Component | ui draggable', {
  integration: true,
  beforeEach() {
    draggablePerson = 'Chewbacca';
    people = Ember.A([
      { name: 'Han' },
      { name: 'Luke' },
      { name: 'Leia' }
    ]);
  }
});

// Set any properties with this.set('myProperty', 'value');
// Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

test('should render the template for the item', function(assert) {
  this.set('draggablePerson', draggablePerson);

  this.render(hbs`
    {{#ui-draggable}}
      {{draggablePerson}}
    {{/ui-draggable}}
  `);

  assert.equal(this.$('div').length, 1);
  assert.equal(this.$('div').text().trim(), 'Chewbacca');
});

test('should render the template for the item with the specified tag', function(assert) {
  this.set('draggablePerson', draggablePerson);

  this.render(hbs`
    {{#ui-draggable tagName='li'}}
      {{draggablePerson}}
    {{/ui-draggable}}
  `);

  assert.equal(this.$('li').length, 1);
  assert.equal(this.$('li').text().trim(), 'Chewbacca');
});

test('should update the component if content is replaced', function(assert) {
  this.set('draggablePerson', draggablePerson);

  this.render(hbs`
    {{#ui-draggable}}
      {{draggablePerson}}
    {{/ui-draggable}}
  `);

  assert.equal(this.$('div').length, 1);
  assert.equal(this.$('div').text().trim(), 'Chewbacca');

  this.set('draggablePerson', 'C3PO');

  assert.equal(this.$('div').length, 1);
  assert.equal(this.$('div').text().trim(), 'C3PO');
});

test('should insert draggable item into the sortable', function(assert){
  this.set('draggablePerson', draggablePerson);
  this.set('people', people);

  this.on('inserted', (item, newIndex) => {
    assert.equal(newIndex, 0);
  });

  this.render(hbs`
    {{#ui-draggable
      appendTo='body'
      helper='clone'
      connectToSortable='#test-sortable'
    }}
      {{draggablePerson}}
    {{/ui-draggable}}
    
    {{#ui-sortable 
      id='test-sortable'
      content=people
      inserted=(action "inserted")
    as |item|}}
      <li>{{item.name}}</li>
    {{/ui-sortable}}
  `);

  this.$('.ui-draggable').simulate('drag', { dy: 22 });

  assert.equal(this.$('.ui-draggable').draggable('option', 'connectToSortable'), '#test-sortable');
});
