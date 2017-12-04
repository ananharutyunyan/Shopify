/* eslint-disable global-require, import/no-dynamic-require */
const fs = require('fs')
/**
 * Find and return the user webpack config or an empty object if none is found.
 *
 * @param   env   String  The environment
 * @return        Object
 */
module.exports = (env) => {
  if (!['dev', 'prod'].includes(env)) {
    return {}
  }
  const configPath = `../config/webpack.dev.conf.js`
  if (fs.existsSync(configPath)) {
    return require(configPath)
  }
  return {}
}