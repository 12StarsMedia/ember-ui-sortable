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

    let evts = ['start', 'stop', 'out', 'over'];

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
    let moved = this.get('moved');

    if (content && moved) {
      let item = content.objectAt(oldIndex);
      return moved(item, oldIndex, newIndex);
    }
  },

  over(event, ui) {
    console.log(event, ui);
    // Do stuff...
  },

  out(event,ui) {
    console.log(event, ui);
    // Do stuff...
  },

  start(event, ui) {
    ui.item.data('oldIndex', ui.item.index());
  },

  stop(event, ui) {
    if(ui.item.hasClass('draggable-item')){
      let newIndex = ui.item.index();
      let item = ui.item;

      item.detach();
      this.attrs.inserted(item, newIndex);
    } else {
      const oldIndex = ui.item.data('oldIndex');
      const newIndex = ui.item.index();

      this.move(oldIndex, newIndex);
    }
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
