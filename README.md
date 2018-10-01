# ember-ui-sortable

[![Build Status](https://travis-ci.org/12StarsMedia/ember-ui-sortable.svg?branch=master)](https://travis-ci.org/12StarsMedia/ember-ui-sortable)

## DEPRECATED

This plugin is no longer maintained. Please use another sorting plugin for EmberJS, like [Ember Sortable](https://emberobserver.com/addons/ember-sortable).

An [Ember](http://emberjs.com) 1.13+ component for [jQuery UI's Sortable Widget](http://jqueryui.com/sortable/). This addon is a fork of [ivy-sortable](https://github.com/IvyApp/ivy-sortable).


## Installation

As an [ember-cli](http://www.ember-cli.com) addon:

```sh
ember install ember-ui-sortable
```

## Usage

This addon provides two components for your sorting pleasure.

1. `{{#ui-sortable}}...{{/ui-sortable}}` takes an array of thingies (technical term) and spits out a sortable list. 
2. `{{#ui-draggable}}...{{/ui-draggable}}` can wrap around anything you want to drag around your UI like a dirty blanket. Using the `connectToSortable` option, you can plop this draggable in a sortable and win all the prizes.


### Sortable Component

Use the `ui-sortable` component block to iterate over the wrapped content:

```handlebars
{{#ui-sortable content=people as |person|}}
  <li>Hi there, {{person.name}}</li>
{{/ui-sortable}}
```

This will output a sortable list, and dragging and dropping items will reorder them in the passed in `content` array. To handle an action on the parent controller or component, you can bind an action to the `moved` property. The `moved` action will return three arguments, the object being moved, the previous index, and the new index. 

Following the principle of Data Down Actions Up (DDAU), the sortable component doesn't modify the content array. You'll need to do it yourself with the action bound to `moved`.

```handlebars
{{#ui-sortable content=people moved=(action "movedPerson") as |person|}}
  <li>Hi there, {{person.name}}</li>
{{/ui-sortable}}
```

Handle this action like so...

```js
// controller|component.js
export default {
  actions: {
    movedPerson: function(person, oldIndex, newIndex) {
      // do rad stuff...ajax or something
      // Here's an example, where model is an array of something
      const content = this.get('model'); 
      content.removeAt(oldIndex);
      content.insertAt(newIndex, person);
      return content.save();
    }
  }
}
```

Add a `connectWith` option to allow dragging items _between_ lists! Make a Trello clone, or something. Be awesome.

```js
{{#ui-sortable class="connected" connectWith=".connected"}}...{{/ui-sortable}}
{{#ui-sortable class="connected" connectWith=".connected"}}...{{/ui-sortable}}
```

#### Sortable Options

The following [jQuery UI Sortable options](http://api.jqueryui.com/sortable/#options) are supported:

  * `axis`
  * `appendTo`
  * `connectWith`
  * `containment`
  * `cursorAt`
  * `cursor`
  * `delay`
  * `disabled`
  * `distance`
  * `forceHelperSize`
  * `forcePlaceholderSize`
  * `grid`
  * `handle`
  * `helper`
  * `opacity`
  * `placeholder`
  * `revert`
  * `scrollSensitivity`
  * `scrollSpeed`
  * `scroll`
  * `tolerance`
  * `zIndex`

### Draggable Component

Use the `ui-draggable` component block to wrap something else and make it draggable:

```handlebars
{{#ui-draggable}}
  <li>Hi there, {{person.name}}</li>
{{/ui-draggable}}
```

Add an optional `connectToSortable` property to allow dragging this element to a `ui-sortable` list. #winning.

```handlebars
{{#ui-draggable connectToSortable=".draggable-target"}}
  <li>Hi there, {{person.name}}</li>
{{/ui-draggable}}

{{#ui-sortable class="draggable-target"}}...{{/ui-sortable}}
```


#### Draggable Options

The following [jQuery UI Draggable options](http://api.jqueryui.com/draggable/#options) are supported:

  * `addClasses`
  * `axis`
  * `appendTo`
  * `connectToSortable`
  * `containment`
  * `cursorAt`
  * `cursor`
  * `delay`
  * `disabled`
  * `distance`
  * `grid`
  * `handle`
  * `helper`
  * `opacity`
  * `refreshPositions`
  * `revert`
  * `revertDuration`
  * `scrollSensitivity`
  * `scrollSpeed`
  * `scroll`
  * `snap`
  * `snapMode`
  * `snapTolerance`
  * `stack`
  * `zIndex`

## TODO:

- [x] Demo app
- [ ] Droppable component. Why not? `¯\_(ツ)_/¯`

## Contributors

- [Todd Smith-Salter](https://github.com/ToddSmithSalter)
- [Nick Schot](https://github.com/nickschot)
- [Andrew Branch](https://github.com/andrewbranch)

## Contributing

Fork this repo, make a new branch, and send a pull request. Make sure your change is tested or it won't be merged.

To run tests:

```sh
git clone # <this repo>
npm install
npm test
```

Or, to start a test server that continually runs (for development):

```sh
ember test --server
```
