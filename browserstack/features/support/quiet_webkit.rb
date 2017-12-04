require 'capybara/webkit'
require 'capybara-screenshot/cucumber'


Capybara::Webkit.configure do |config|
  config.debug = false

  config.skip_image_loading if !!ENV['SKIP_IMAGES']

  config.block_unknown_urls

  config.allow_url("www.simplipleasure.com")
  config.allow_url('*.shopify.com')
  config.allow_url('*.shopifycdn.com')
  config.allow_url("*.olark.com")
  config.allow_url("*.akamaized.net")
  config.allow_url("*.klaviyo.com")

  config.allow_url("apis.google.com")
  config.allow_url("*.googleapis.com")
  config.allow_url("*.googleadservices.com")
  config.allow_url("*.google-analytics.com")
  config.allow_url("*.googleusercontent.com")
  config.allow_url("*.googletagmanager.com")
  config.allow_url("acp-magento.appspot.com")

  config.allow_url("*.jquery.com")
  config.allow_url("cdnjs.cloudflare.com")
  config.allow_url("*.trustpilot.com")
  config.allow_url("*.azureedge.net")
  config.allow_url("cdn.ywxi.net")
  config.allow_url("*.sumome.com")

  config.allow_url("*.facebook.com")
  config.allow_url("*.facebook.net")

  config.allow_url("*.bootstrapcdn.com")
  config.allow_url("d37frn105ofurh.cloudfront.net")
  config.allow_url("platform.twitter.com")
  config.allow_url("sumo.com")
  config.allow_url("stamped.io")
  config.allow_url("stats.g.doubleclick.net")

  config.allow_url("https://s3.amazonaws.com/maxeffi/persistent-cart/simplysex.myshopify.com/app.js?shop=simplysex.myshopify.com")
  config.allow_url("https://stamped.io/api/shopify/getappkey?shopShopifyDomain=simplysex.myshopify.com")
  config.allow_url("https://wheelio-a62f3.firebaseapp.com/scripttag.js?shop=simplysex.myshopify.com")
  config.allow_url("https://www.gstatic.com/firebasejs/3.7.3/firebase.js")

  config.allow_url("shopify.instantsearchplus.com")
  config.allow_url("verify.authorize.net")
  config.allow_url("shopify.instantsearchplus.com")
  config.allow_url("acp-suggestr.appspot.com")
  config.allow_url("verify.authorize.net")

end

class QuietWebkitDriverIO
  IGNOREABLE = Regexp.new( [
    'CoreText performance',
    'userSpaceScaleFactor',
    'Internet Plug-Ins',
    'is implemented in bo'
  ].join('|') )

  def write(message)
    if message =~ IGNOREABLE
      0
    else
      puts(message)
      1
    end
  end
end

Capybara.register_driver :quiet_webkit do |app|
  driver = Capybara::Webkit::Driver.new(
    app,
    Capybara::Webkit::Configuration.to_hash.merge(
      stderr: QuietWebkitDriverIO.new
    )
  )
  driver
end

Capybara::Screenshot.register_driver(:quiet_webkit) do |driver, path|
  if driver.respond_to?(:save_screenshot)
    driver.save_screenshot(path)
  else
    driver.render(path)
  end
end

Capybara::Screenshot.autosave_on_failure = false if ENV['DISABLE_SCREENSHOTS']