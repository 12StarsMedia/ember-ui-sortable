/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-ui-sortable',

  included: function(app) {
    app.import(app.bowerDirectory + '/jquery-ui/ui/core.js');
    app.import(app.bowerDirectory + '/jquery-ui/ui/widget.js');
    app.import(app.bowerDirectory + '/jquery-ui/ui/mouse.js');
    app.import(app.bowerDirectory + '/jquery-ui/ui/sortable.js');
  }
};
