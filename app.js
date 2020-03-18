'use strict';

module.exports = app => {
  require('./lib/kubernetes')(app);
};