
When /^I fill in "([^\"]*)" found by "([^\"]*)" with "([^\"]*)"$/ do |value, type, keys|
  fill_in(value, :with => keys, :match => :first)
end


When /^I search for "([^\"]*)"$/ do |query|
  @home.search_bar.search(query)
  @search_results = Pages::SearchResults.new(query: query)
  expect(@search_results).to be_loaded
end

Then /^I should see search results for "([^\"]*)"$/ do |query|
  expect(@search_results.query).to eq(query)
  expect(@search_results.title).to eq("#{query.titleize} | Simpli Pleasure")
  expect(@search_results).to have_text(%Q{RESULTS FOR "#{query.upcase}"})
end

When /^I submit the search$/ do
  search_field = find_field('q', :match => :first)

  case Capybara.current_driver
  when :webkit,  :quiet_webkit
    search_field.send_keys(:enter)
  else
    search_field.native.send_key(:enter)
  end
end

Then /^I should see title "([^\"]*)"$/ do |title|
  expect(page).to have_title title
end


Then /^I should see a search result for product (\d+): "([^\"]*)"$/ do |product_id, product_name|
  expect(@search_results).to have_result_for(id: product_id, name: product_name)
end

When /^I click on the search result for product (\d+)$/ do |product_id|
  @search_results ||= Pages::SearchResults.new
  @search_results.click_result_for(product_id)
end