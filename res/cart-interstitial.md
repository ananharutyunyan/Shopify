* [ x] setup branch & theme copy
* [ x] document current behaviour, with templates, assets & css identifiers involved
* [ x] local selenium setup
* [x] find out where .main_prod_form_1 was used on master
* [x] add identifying classes to product form
* [x] cart-interstitial template
  * [x] 1 item was added to your basket
  * [x] cart total
  * [x] proceed to cart button
  * [x] upsell list
    * [x] image
    * [x] title
    * [x] reviews
    * [x] description
    * [x] price
    * [x] add to cart
* [x] implement upsell add to cart
* [x] handle product with variants, ex: https://simplysex.myshopify.com/admin/products/4782747588
* [ ] handle upsell boxes https://www.simplipleasure.com/products/fleshjack-endurance-jack-value-pack
  * [ ] cleanup snippets/product-page-upsells.liquid similarly to bundles
* [ ] ensure works on top-10 template: https://www.simplipleasure.com/products/copy-of-classix-penis-power-pump
* [x] layout of upsells: grid 3x2 or 2x3
* [x] switch to using linked list for upsells, and metafield for custom description (this was necessary because there is no ajax api for metafields)
* [x] verify that selectCallback is behaving correctly
* [x] responsive design
* [x] switch description metafield to be on variant
* [ ] move css to styles.css
* [ ] write tests!
* [x]   implement add bundle https://www.simplipleasure.com/products/lelo-gigi-2-luxury-rechargeable-g-spot-vibrator?variant=1022505268
  * [x] snippets/product-page-bundle.liquid
  * [x] make sure correct number of items added to cart in message
  * [x] cleanup!
    * [x] extract product-page-bundle-checkboxes
    * [x] extract product-page-bundle-thumbs
    * [x] give hidden form & its inputs proper selectors, changing selectCallback correspondingly
    * [x] change selectCallback to handle bundle hidden inputs more robustly
    * [x] replace bandle-popup with product-form-small and/or extract common elements
* [x] when adding this one: https://www.simplipleasure.com/collections/fleshlight/products/fleshlight-go-pink-lady-surge, there's no price!
* [x] have the was price for on-sale items if possible
* [x] hardcode the badges
* [ ] rework history manip  to set path, for analytics
* [ ] use product.metafields.interstitial.category to choose upsell linklist

# Add To Cart Button:

* currently in the following snippets:

snippets/product-form.liquid
  snippets/product-thumbnail-2.liquid
  snippets/product-thumbnail.liquid

snippets/product-form-2.liquid
    templates/product.liquid
    templates/product.bottom.liquid
    templates/product.top-10.liquid

snippets/product-form-3.liquid
    templates/product.bottom.liquid

snippets/product-form-full.liquid
    templates/product.bottom.liquid

snippets/product-form-march-1.liquid
    templates/product.liquid

snippets/product-form-march-6.liquid
    templates/product.liquid




snippets/product-form-2.liquid
  product-select-bottom-{{ product.id }}
snippets/product-form-3.liquid
  product-select-mobile-{{ product.id }}
snippets/product-form-full.liquid
  product-select-desktop-{{ product.id }}



# Questions & Issues
1. in templates/product.bottom.liquid,  what are the empty div & a tag for?
2. <span class="sold_out"> should be inside the if?
3. link lists can only link to products.  Intimate Organics Natural Warming Lubricant 60-240ml: 3 variants,  100% Vegan Water Slide Personal Lubricant: 2 variants. will use selected_or_first_available_variant, which is returning the variants you specified
4. get simply embed code for fontawesome, currently using mine.
5. Why the if statement in product.top-10.liquid? Only top-10 products are set to that template, so why do we need the if statement? Also, recommend linking to the top-10 list.
6. top 10 page templates. Can we remvoe the old versions?
["top-10", 2],
 ["top-10-couples", 1],
 ["top-10-couples-NEW", 1],
 ["top-10-men", 1],
 ["top-10-men-NEW", 1],
 ["top-10-women-NEW", 1],
# Questions & Issues 2
1. Can we remove handle_product_form? What other "old" cart interstitial stuff can we remove?
2. PROBLEM: how id="product-{{product-or-variant-id}}" is used. It is used in container divs for products, and selectCallback relies on this to set up a whole bunch of spans (was-price etc.). It is also used in inputs (checkboxes) used in bundles & upsells -- when really it is being set to a variant id, not a product id
3. we should clean up `product-page-upsells` to match with how `cart-intersitial` and `product-bundle` have been cleaned up / handled
4. why the half second timeout to change  which variant is selected?

# Settings Removed
product_images_position="left"




# options_selection.js
https://help.shopify.com/themes/customization/products/use-products-with-multiple-options
https://www.shopify.ca/partners/blog/96667526-shopify-tutorial-the-product-liquid-template?rodeo_token=c6600a80-37bc-4e3b-b7d5-92b68714613c