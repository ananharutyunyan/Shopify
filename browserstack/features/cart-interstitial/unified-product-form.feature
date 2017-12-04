@dev
Feature: Unified Product Form
  In order to add cart interstitials
  As developers
  We want a single product_form snippet

Background:
  Given I am on the store home page

@desktop
Scenario: Product using product.liquid on desktop
  When I go to a product that uses template "product.liquid"
  Then I should see a "desktop" add-to-cart button
  And I should see a "bottom" add-to-cart button

@mobile
Scenario: Product using product.liquid on desktop
  When I go to a product that uses template "product.liquid"
  Then I should see a "mobile" add-to-cart button
  And I should see a "bottom" add-to-cart button

