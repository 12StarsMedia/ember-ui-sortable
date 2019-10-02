import Ember from 'ember';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

var people;

module('Integration | Component | ui sortable', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  hooks.beforeEach(function() {
    people = Ember.A([
      { name: 'Han' },
      { name: 'Luke' },
      { name: 'Leia' }
    ]);
  });

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  test('should render the template for each item in an array', async function(assert) {
    this.set('people', people);

    await render(hbs`
      {{#ui-sortable content=people as |item|}}
        <li>{{item.name}}</li>
      {{/ui-sortable}}
    `);

    assert.equal(findAll('li').length, 3);
    assert.equal(find('li').textContent, 'HanLukeLeia');
  });

  test('should update the component if content is replaced', async function(assert) {
    this.set('people', people);

    await render(hbs`
      {{#ui-sortable content=people as |item|}}
        <li>{{item.name}}</li>
      {{/ui-sortable}}
    `);

    assert.equal(findAll('li').length, 3);
    assert.equal(find('li').textContent, 'HanLukeLeia');

    this.set('people', Ember.A([
      { name: 'Sue' },
      { name: 'Reed' }
    ]));

    assert.equal(findAll('li').length, 2);
    assert.equal(find('li').textContent, 'SueReed');
  });

  test('should update the component if an item is added', async function(assert) {
    this.set('people', people);

    await render(hbs`
      {{#ui-sortable content=people as |item|}}
        <li>{{item.name}}</li>
      {{/ui-sortable}}
    `);

    Ember.run(function() {
      people.pushObject({ name: 'Chewbacca' });
    });
    assert.equal(findAll('li').length, 4);
    assert.equal(find('li').textContent, 'HanLukeLeiaChewbacca');
  });

  test('should update the component if an item is removed', async function(assert) {
    this.set('people', people);

    await render(hbs`
      {{#ui-sortable content=people as |item|}}
        <li>{{item.name}}</li>
      {{/ui-sortable}}
    `);

    Ember.run(function() {
      people.removeAt(0);
    });
    assert.equal(findAll('li').length, 2);
    assert.equal(find('li').textContent, 'LukeLeia');
  });

  test('should update the component if an item is replaced', async function(assert) {
    this.set('people', people);
    this.set('moved', () => assert.ok(true) );

    await render(hbs`
      {{#ui-sortable content=people moved=moved as |item|}}
        <li>{{item.name}}</li>
      {{/ui-sortable}}
    `);

    Ember.run(function() {
      people.removeAt(0);
      people.insertAt(0, { name: 'Finn' });
    });
    assert.equal(findAll('li').length, 3);
    assert.equal(find('li').textContent, 'FinnLukeLeia');
  });

  test('should send the content if an item is dragged', async function(assert) {
    assert.expect(4);
    this.set('people', people);

    this.actions.moved = (item, oldIndex, newIndex) => {
      people.removeAt(oldIndex);
      people.insertAt(newIndex, item);

      assert.deepEqual(item, { name: "Han" });
      assert.equal(oldIndex, 0);
      assert.equal(newIndex, 1);
      assert.equal(this.get('people').objectAt(newIndex).name, 'Han');
    };

    await render(hbs`
      {{#ui-sortable content=people moved=(action "moved") as |item|}}
        <li>{{item.name}}</li>
      {{/ui-sortable}}
    `);

    // return stop();

    this.$('li:eq(0)').simulate('drag', { dy: 22 });
  });

  test('should become disabled if the disabled attribute is true', async function(assert) {
    assert.expect(3);
    this.set('people', people);
    this.actions.moved = (item, oldIndex, newIndex) => {
      if (this.get('disabled')) {
        assert.equal(true); // This shouldn't pass
      } else {
        assert.deepEqual(item, { name: "Han" });
        assert.equal(oldIndex, 0);
        assert.equal(newIndex, 1);
      }
    };
    this.set('disabled', true);

    await render(hbs`
      {{#ui-sortable content=people moved=(action "moved") disabled=disabled as |item|}}
        <li>{{item.name}}</li>
      {{/ui-sortable}}
    `);

    this.$('li:eq(0)').simulate('drag', { dy: 22 });
    this.set('disabled', false);
    this.$('li:eq(0)').simulate('drag', { dy: 22 });
  });

  test('should not refresh after destruction', async function(assert) {
    assert.expect(1);

    this.set('people', people);
    this.set('showComponent', true);

    await render(hbs`
      {{#if showComponent}}
        {{#ui-sortable content=people as |item|}}
          <li>{{item.name}}</li>
        {{/ui-sortable}}
      {{/if}}
    `);

    Ember.run(function() {
      people.pushObject({ name: 'Chewbacca' });
    });
    this.set('showComponent', false);

    assert.ok(true, 'no error was thrown');
  });

  test('should update jQuery UI options when property values change', async function(assert) {
    this.set('people', people);

    let options = {
      'axis': false,
      'containment': false,
      'cursor': 'auto',
      'cursorAt': false,
      'delay': 0,
      'disabled': false,
      'distance': 1,
      'forceHelperSize': false,
      'forcePlaceholderSize': false,
      'grid': false,
      'handle': false,
      'opacity': false,
      'revert': false,
      'scroll': true,
      'scrollSensitivity': 20,
      'scrollSpeed': 20,
      'tolerance': 'intersect',
      'zIndex': 1000
    };

    let afterOptions = {
      'axis': 'x',
      'containment': 'parent',
      'cursor': 'move',
      'cursorAt': { left: 5 },
      'delay': 150,
      'disabled': true,
      'distance': 5,
      'forceHelperSize': true,
      'forcePlaceholderSize': true,
      'grid': [20, 10],
      'handle': '.handle',
      'opacity': 0.5,
      'revert': true,
      'scroll': false,
      'scrollSensitivity': 10,
      'scrollSpeed': 40,
      'tolerance': 'pointer',
      'zIndex': 9999
    };

    this.setProperties(options);

    await render(hbs`
      {{#ui-sortable content=people
                     axis=axis
                     containment=containment
                     cursor=cursor
                     cursorAt=cursorAt
                     delay=delay
                     disabled=disabled
                     distance=distance
                     forceHelperSize=forceHelperSize
                     forcePlaceholderSize=forcePlaceholderSize
                     grid=grid
                     handle=handle
                     helper=helper
                     opacity=opacity
                     placeholder=placeholder
                     revert=revert
                     scroll=scroll
                     scrollSensitivity=scrollSensitivity
                     scrollSpeed=scrollSpeed
                     tolerance=tolerance
                     zIndex=zIndex
                     as |item|}}
        <li>{{item.name}}</li>
      {{/ui-sortable}}
    `);

    Object.keys(options).forEach(key => assert.equal(this.$('.ui-sortable').sortable('option', key), options[key],
        'precondition - initial value of ' + key + ' option is correct'));


    this.setProperties(afterOptions);

    Object.keys(afterOptions).forEach(key => assert.equal(this.$('.ui-sortable').sortable('option', key), afterOptions[key],
        key + ' option is updated after ' + key + ' property is changed'));
  });
});


