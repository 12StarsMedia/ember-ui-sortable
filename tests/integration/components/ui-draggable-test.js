import Ember from 'ember';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

var draggablePerson;
var people;

module('Integration | Component | ui draggable', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  hooks.beforeEach(function() {
    draggablePerson = 'Chewbacca';
    people = Ember.A([
      { name: 'Han' },
      { name: 'Luke' },
      { name: 'Leia' }
    ]);
  });

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  test('should render the template for the item', async function(assert) {
    this.set('draggablePerson', draggablePerson);

    await render(hbs`
      {{#ui-draggable}}
        {{draggablePerson}}
      {{/ui-draggable}}
    `);

    assert.equal(findAll('div').length, 1);
    assert.equal(find('div').textContent.trim(), 'Chewbacca');
  });

  test('should render the template for the item with the specified tag', async function(assert) {
    this.set('draggablePerson', draggablePerson);

    await render(hbs`
      {{#ui-draggable tagName='li'}}
        {{draggablePerson}}
      {{/ui-draggable}}
    `);

    assert.equal(findAll('li').length, 1);
    assert.equal(find('li').textContent.trim(), 'Chewbacca');
  });

  test('should update the component if content is replaced', async function(assert) {
    this.set('draggablePerson', draggablePerson);

    await render(hbs`
      {{#ui-draggable}}
        {{draggablePerson}}
      {{/ui-draggable}}
    `);

    assert.equal(findAll('div').length, 1);
    assert.equal(find('div').textContent.trim(), 'Chewbacca');

    this.set('draggablePerson', 'C3PO');

    assert.equal(findAll('div').length, 1);
    assert.equal(find('div').textContent.trim(), 'C3PO');
  });

  test('should insert draggable item into the sortable', async function(assert) {
    this.set('draggablePerson', draggablePerson);
    this.set('people', people);

    this.actions.inserted = (item, newIndex) => {
      assert.equal(newIndex, 0);
    };

    await render(hbs`
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
});
