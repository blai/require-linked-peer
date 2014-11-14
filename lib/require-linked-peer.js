'use strict';

var path = require('path');

module.exports = function (r) {
  for (var parent = module.parent; parent; parent = parent.parent) {
    if (parent.paths && parent.paths.length && parent.paths[0] === path.join(process.cwd(), 'node_modules')) {
      return parent.require(r);
    }
  }
  return require(r);
}
