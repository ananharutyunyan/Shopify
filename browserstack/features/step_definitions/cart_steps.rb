Then(/^I should see a "([^"]*)" add\-to\-cart button$/) do |product_form_identifier|
  @product_page ||= Pages::Product.new
  expect(@product_page).to have_add_to_cart_button_with_identifier(product_form_identifier)
end