require 'yaml'
require 'selenium/webdriver'
require 'browserstack/local'
require 'capybara/cucumber'
require 'capybara/webkit'
require 'capybara-screenshot/cucumber'

# require './fast_selenium'

# monkey patch to avoid reset sessions
class Capybara::Selenium::Driver < Capybara::Driver::Base
  def reset!
    if @browser
      @browser.navigate.to('about:blank')
    end
  end
end

TASK_ID = (ENV['TASK_ID'] || 0).to_i
puts "ENV['CONFIG_NAME']: #{ENV['CONFIG_NAME'].inspect}"
CONFIG_NAME = ENV['CONFIG_NAME'] || 'live'

CONFIG = YAML.load(File.read(File.join(File.dirname(__FILE__), "../../config/#{CONFIG_NAME}.config.yml")))
CONFIG['user'] = ENV['BROWSERSTACK_USERNAME'] || CONFIG['user']
CONFIG['key'] = ENV['BROWSERSTACK_ACCESS_KEY'] || CONFIG['key']

CONFIG['urls'] ||= {}
CONFIG['urls']['store'] = ENV['STORE_URL'] unless ENV['STORE_URL'].nil?

ENV['SKIP_IMAGES'] = 1 if CONFIG['skip_images']

puts "CONFIG: #{CONFIG.inspect}"

driver = CONFIG.fetch('driver', :browserstack)

case driver
when :browserstack
  Capybara.register_driver :browserstack do |app|
    @caps = CONFIG['common_caps'].merge(CONFIG['browser_caps'][TASK_ID])

    # Code to start browserstack local before start of test
    if @caps['browserstack.local'] && @caps['browserstack.local'].to_s == 'true';
      @bs_local = BrowserStack::Local.new
      bs_local_args = {"key" => "#{CONFIG['key']}"}
      @bs_local.start(bs_local_args)
    end

    Capybara::Selenium::Driver.new(app,
      :browser => :remote,
      :url => "http://#{CONFIG['user']}:#{CONFIG['key']}@#{CONFIG['server']}/wd/hub",
      :desired_capabilities => @caps
    )
  end
when :webkit, :quiet_webkit
  Capybara.save_and_open_page_path = 'tmp/screenshots'
end

Capybara.default_driver = driver
puts "using driver: #{Capybara.default_driver}"

Capybara.run_server = false

# Code to stop browserstack local after end of test
at_exit do
  @bs_local.stop unless @bs_local.nil?
end

puts "setup END"