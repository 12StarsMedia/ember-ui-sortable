/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-ui-sortable',

  included: function(app) {
    app.import('node_modules/jquery-ui/ui/version.js');
    app.import('node_modules/jquery-ui/ui/data.js');
    app.import('node_modules/jquery-ui/ui/ie.js');
    app.import('node_modules/jquery-ui/ui/safe-active-element.js');
    app.import('node_modules/jquery-ui/ui/safe-blur.js');
    app.import('node_modules/jquery-ui/ui/scroll-parent.js');
    app.import('node_modules/jquery-ui/ui/plugin.js');
    app.import('node_modules/jquery-ui/ui/widget.js');
    app.import('node_modules/jquery-ui/ui/widgets/mouse.js');
    app.import('node_modules/jquery-ui/ui/widgets/draggable.js');
    app.import('node_modules/jquery-ui/ui/widgets/sortable.js');
  }
};
