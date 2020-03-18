'use strict';

const path = require('path');
const Client = require('kubernetes-client').Client;
const K8sConfig = require('kubernetes-client').config;

module.exports = app => {
  const config = app.config.kubernetes;

  app.kubernetes = new Client({
    version: config.version,
    config: K8sConfig.fromKubeconfig(config.kubeConfig, config.current),
  });

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