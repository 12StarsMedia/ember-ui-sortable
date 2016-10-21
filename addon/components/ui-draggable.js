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

  tagName: 'div',

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
    this.$().draggable('destroy');
  }),

  initDraggable: on('didInsertElement', function () {
    let opts = {};

    ['start'].forEach((callback) => {
      opts[callback] = run.bind(this, callback);
    });

    this.$().draggable(opts);

    this.get('uiOptions').forEach((option) => {
      this._bindDraggableOption(option);
    });
  }),

  contentObserver: observer('content.[]', function () {
    run.scheduleOnce('afterRender', this, this._refreshDraggable);
  }),

  start(event, ui) {
    ui.helper.addClass('draggable-item');
  },

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
    this.$().draggable('option', key, this.get(key));
  },

  _refreshDraggable() {
    if (this.isDestroying) { return; }
    this.$().draggable('refresh');
  }
});
