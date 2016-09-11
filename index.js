/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-ui-sortable',

  included: function(app) {
    this._super.included(app);

    //app.import(app.bowerDirectory + '/jquery-ui/ui/data.js');
    //app.import(app.bowerDirectory + '/jquery-ui/ui/scroll-parent.js');
    //app.import(app.bowerDirectory + '/jquery-ui/ui/widget.js');
    //app.import(app.bowerDirectory + '/jquery-ui/ui/widgets/mouse.js');
    //app.import(app.bowerDirectory + '/jquery-ui/ui/widgets/draggable.js');
    //app.import(app.bowerDirectory + '/jquery-ui/ui/widgets/sortable.js');
    app.import(app.bowerDirectory + '/jquery-ui/jquery-ui.js');
  }
};
