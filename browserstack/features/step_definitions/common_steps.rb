
Given /^I am on the store home page$/ do
  @home = Pages::Home.new
  @home.load
  Capybara.app_host = @home.current_url
  expect(@home).to have_search_bar
  expect(@home).to have_welcome
end

Given /^I am on (http.*)$/ do |url|
  visit url
end

Then /^I should see "([^\"]*)"$/ do |body|
  expect(page).to have_text body
end

Then /^I should see '([^\']*)'$/ do |body|
  expect(page).to have_text body
end

Then /^I dump.* the response$/ do
  puts body
end

Then /I check the current url/ do
  puts "current_url: #{current_url.inspect}"
end