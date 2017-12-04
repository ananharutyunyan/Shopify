Feature: Bob Buys a Vibrator
  In order to buy a vibrator
  As a customer
  I want to search for what I want, view it, add it to the cart, and checkout

Background:
  Given I am on the store home page

Scenario: Search for a product and buy it
  When I search for "purple vibrator"
  Then I should see search results for "purple vibrator"
  And I should see a search result for product 384447184: "Clone-A-Willy Vibrator Moulding Kit Neon Purple"
  When I click on the search result for product 384447184
  Then I should be on the product page for "Clone-A-Willy Vibrator Moulding Kit Neon Purple"
  When I click on add to cart
  Then I should see "YOUR CART CONTAINS 1 ITEM"
  And I should see "Clone-A-Willy Vibrator Moulding Kit Neon Purple"

