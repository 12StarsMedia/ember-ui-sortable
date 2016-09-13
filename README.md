# ember-ui-sortable

[![Build Status](https://travis-ci.org/12StarsMedia/ember-ui-sortable.svg?branch=master)](https://travis-ci.org/12StarsMedia/ember-ui-sortable)

An [Ember](http://emberjs.com) 1.13+ component for [jQuery UI's Sortable Widget](http://jqueryui.com/sortable/). This addon is a fork of [ivy-sortable](https://github.com/IvyApp/ivy-sortable).


## Installation

As an [ember-cli](http://www.ember-cli.com) addon:

```sh
ember install ember-ui-sortable
```

## Usage

Use the `ui-sortable` component block to iterate over the wrapped content:

```handlebars
{{#ui-sortable content=people as |person|}}
  <li>Hi there, {{person.name}}</li>
{{/ui-sortable}}
```

This will output a sortable list, and dragging and dropping items will reorder them in the passed in `content` array. To handle and action on the parent controller or component, you can bind an action to the `moved` property. The `moved` action will return three arguments, the object being moved, the previous index, and the new index.

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
    }
  }
}
```

## Options

The following [jQuery UI Sortable options](http://api.jqueryui.com/sortable/#options) are supported:

  * `axis`
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

## TODO:

- [x] Demo app

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
