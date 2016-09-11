import Ember from 'ember';
import layout from '../templates/components/ui-draggable';

const {
  observer,
  on,
  run
} = Ember;

export default Ember.Component.extend({
  layout: layout,
  disabled: false,

  tagName: 'ul',
  classNames: ['toolbar-item-list row'],

  uiOptions: [
    'addClasses',
    'axis',
    'appendTo',
    'connectToSortable',
    'containment',
    'cursor',
    'cursorAt',
    'delay',
    'disabled',
    'distance',
    'grid',
    'handle',
    'helper',
    'opacity',
    'refreshPositions',
    'revert',
    'revertDuration',
    'scroll',
    'scrollSensitivity',
    'scrollSpeed',
    'snap',
    'snapMode',
    'snapTolerance',
    'stack',
    'zIndex'
  ],

  destroyDraggable: on('willDestroyElement', function() {
    this.$().children().draggable('destroy');
  }),

  initDraggable: on('didInsertElement', function () {
    let opts = {};

    //['start', 'stop'].forEach((callback) => {
    //  opts[callback] = run.bind(this, callback);
    //});

    this.$().children().draggable(opts);

    this.get('uiOptions').forEach((option) => {
      this._bindDraggableOption(option);
    });
  }),

  contentObserver: observer('content.[]', function () {
    run.scheduleOnce('afterRender', this, this._refreshDraggable);
  }),

/*  move(oldIndex, newIndex) {
    let content = this.get('content');

    if (content) {
      var item = content.objectAt(oldIndex);

      content.removeAt(oldIndex);
      content.insertAt(newIndex, item);

      this.attrs.moved(item, oldIndex, newIndex);
    }
  },

  start(event, ui) {
    ui.item.data('oldIndex', ui.item.index());
  },

  stop(event, ui) {
    const oldIndex = ui.item.data('oldIndex');
    const newIndex = ui.item.index();

    this.move(oldIndex, newIndex);
  },*/

  _bindDraggableOption: function(key) {
    this.addObserver(key, this, this._optionDidChange);

    if (key in this) {
      this._optionDidChange(this, key);
    }

    this.on('willDestroyElement', this, function() {
      this.removeObserver(key, this, this._optionDidChange);
    });
  },

  _optionDidChange(sender, key) {
    this.$().children().draggable('option', key, this.get(key));
  },

  _refreshDraggable() {
    if (this.isDestroying) { return; }
    this.$().children().draggable('refresh');
  }
});
