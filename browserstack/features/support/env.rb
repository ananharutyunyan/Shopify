require 'active_support/inflector'
require 'site_prism'
require 'byebug'
require 'active_support/core_ext/hash'
require 'active_support/core_ext/string'


SitePrism.configure do |config|
  config.use_implicit_waits = true
end