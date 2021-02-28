const _ = require('lodash');

function mapConfigToDefinePlugin(conf) {
  const res = {};

  for (const key in conf) {
    res[`process.env.${key}`] = JSON.stringify(conf[key]);
  }

  return res;
}

function getDefinePluginConfig(projectDir, configName) {
  const config = {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV === 'production' ? 'production' : 'development'),
  };

  try {
    const patch = mapConfigToDefinePlugin(require(`${projectDir}/.webpack/configs/default`));
    Object.assign(config, patch);
  } catch (error) {
    //
  }

  try {
    const patch = mapConfigToDefinePlugin(require(`${projectDir}/.webpack/configs/${configName}`));
    Object.assign(config, patch);
  } catch (error) {
    //
  }

  // every entry can be overriden in dev from process.env
  const keysToOverride = Object.keys(config).map((key) => key.replace(/^process\.env\./, ''));
  const overrideEntries = keysToOverride.map((key) => [`process.env.${key}`, JSON.stringify(process.env[key])]);

  const res = _.merge(config, Object.fromEntries(overrideEntries));

  return res;
}

module.exports = {
  getDefinePluginConfig,
};
