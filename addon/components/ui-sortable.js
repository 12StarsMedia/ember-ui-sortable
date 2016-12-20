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
    'connectWith',
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
    const opts = {};

    ['start', 'stop', 'out', 'over'].forEach((callback) => {
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
    const content = this.get('content');
    const moved = this.get('moved');

    if (content && moved) {
      const item = content.objectAt(oldIndex);
      return moved(item, oldIndex, newIndex);
    }
  },

  over(event, ui) {
    if(this.attrs.over){
      this.attrs.over(event, ui);
    }
  },

  out(event,ui) {
    if(this.attrs.out){
      this.attrs.out(event, ui);
    }
  },

  start(event, ui) {
    ui.item.data('oldIndex', ui.item.index());
  },

  stop(event, ui) {
    const item = ui.item;
    const newIndex = ui.item.index();

    if(ui.item.hasClass('draggable-item')){
      item.detach();
      this.$().sortable('cancel');
      this.attrs.inserted(item, newIndex);
    } else {
      const oldIndex = ui.item.data('oldIndex');
      this.$().sortable('cancel');
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
