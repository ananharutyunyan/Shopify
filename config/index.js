const paths = require('./paths')
const YAML = require('yamljs')

module.exports = {
  paths,
  domain: 'localhost',
  port: 4042,
  hot: true,
  regex: {
    images: /\.(png|svg|jpg|gif)$/,
    static: /\.(liquid|json)$/
  },
  shopify: YAML.load(paths.userShopifyConfig)
}
