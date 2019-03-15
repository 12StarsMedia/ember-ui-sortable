/* jshint node: true */
'use strict';

const Funnel = require('broccoli-funnel');
const Merge = require('broccoli-merge-trees');
const fastbootTransform = require('fastboot-transform');
const path = require('path');
const existSync = require('exists-sync');

 module.exports = {
  name: 'ember-ui-sortable',

  treeForVendor(tree) {
    const trees = tree ? [tree] : [];
    const assetDir = path.join(this.project.root, 'node_modules', 'jquery-ui');

    if (existSync(assetDir)) {
      trees.push(fastbootTransform(new Funnel(assetDir, {
        srcDir: 'ui',
        destDir: 'jquery-ui/ui'
      })));
    }
    return new Merge(trees);
  },

  included(app) {
    this._super.included(app);
    app.import('vendor/jquery-ui/ui/version.js');
    app.import('vendor/jquery-ui/ui/data.js');
    app.import('vendor/jquery-ui/ui/ie.js');
    app.import('vendor/jquery-ui/ui/safe-active-element.js');
    app.import('vendor/jquery-ui/ui/safe-blur.js');
    app.import('vendor/jquery-ui/ui/scroll-parent.js');
    app.import('vendor/jquery-ui/ui/plugin.js');
    app.import('vendor/jquery-ui/ui/widget.js');
    app.import('vendor/jquery-ui/ui/widgets/mouse.js');
    app.import('vendor/jquery-ui/ui/widgets/draggable.js');
    app.import('vendor/jquery-ui/ui/widgets/sortable.js');
  }
};
