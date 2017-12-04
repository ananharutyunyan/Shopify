Then /^I should be on the product page for product (\d+): "([^\"]*)"$/ do |product_id, product_name|
  steps %Q{
    I should be on the product page for "#{product_name}"
  }
  @product_page.id = product_id
end

Then /^I should be on the product page for "([^\"]*)"$/ do |product_name|
  product = SP::Products.with_name(product_name)
  product ||= {title: product_name}
  @product_page = Pages::Product.new(product: product)
  expect(@product_page).to be_showing_product_handle
  expect(@product_page).to be_showing_product_heading
  expect(@product_page).to have_add_to_cart_button
end

When /^I click on add to cart$/ do
  @product_page ||= Pages::Product.new
  @product_page.click_add_to_cart
end

When(/^I go to a product that uses template "([^"]*)"$/) do |product_template|
  product = SP::Products.with_template(product_template).first
  # byebug
  puts "going to product #{product[:title]}"
  @product_page = Pages::Product.new(product: product)
  @product_page.load
  expect(@product_page).to be_showing_product_handle
  expect(@product_page).to be_showing_product_heading
end
