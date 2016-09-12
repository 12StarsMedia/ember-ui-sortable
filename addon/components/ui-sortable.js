import Ember from 'ember';
import layout from '../templates/components/ui-sortable';

const {
  observer,
  on,
  run
} = Ember;

export default Ember.Component.extend({
  layout: layout,
  disabled: false,

  tagName: 'ul',

  uiOptions: [
    'axis',
    'appendTo',
    'containment',
    'cursor',
    'cursorAt',
    'delay',
    'disabled',
    'distance',
    'forceHelperSize',
    'forcePlaceholderSize',
    'grid',
    'handle',
    'helper',
    'opacity',
    'out',
    'over',
    'placeholder',
    'revert',
    'scroll',
    'scrollSensitivity',
    'scrollSpeed',
    'tolerance',
    'zIndex'
  ],

  destroySortable: on('willDestroyElement', function() {
    this.$().sortable('destroy');
  }),

  initSortable: on('didInsertElement', function () {
    let opts = {};

    let evts = ['start', 'stop'];

    this.out && evts.push('out');
    this.over && evts.push('over');

    evts.forEach((callback) => {
      opts[callback] = run.bind(this, callback);
    });

    this.$().sortable(opts);

    this.get('uiOptions').forEach((option) => {
      this._bindSortableOption(option);
    });
  }),

  contentObserver: observer('content.[]', function () {
    run.scheduleOnce('afterRender', this, this._refreshSortable);
  }),

  move(oldIndex, newIndex) {
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
  },

  _bindSortableOption: function(key) {
    this.addObserver(key, this, this._optionDidChange);

    if (key in this) {
      this._optionDidChange(this, key);
    }

    this.on('willDestroyElement', this, function() {
      this.removeObserver(key, this, this._optionDidChange);
    });
  },

  _optionDidChange(sender, key) {
    this.$().sortable('option', key, this.get(key));
  },

  _refreshSortable() {
    if (this.isDestroying) { return; }
    this.$().sortable('refresh');
  }
});
