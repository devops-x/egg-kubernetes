'use strict';

const path = require('path');
const Client = require('kubernetes-client').Client;

module.exports = app => {
  const config = app.config.kubernetes;

  if (config.enableLocal) {
    app.k8sClient = new Client({ version: '1.13' });
  }

  app.beforeStart(async () => {
    loadModelToApp(app);
  });
};

function loadModelToApp(app) {
  const dir = path.join(app.config.baseDir, 'app/kubernetes');
  app.loader.loadToApp(dir, 'kubernetes', {
    inject: app,
    caseStyle: 'upper',
  });
}