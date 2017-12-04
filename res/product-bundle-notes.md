product bundle:


forms:
* there's only one, and it starts empty except for submit 'Add Bundle 2'
* every time a checkbox changes, a series of inputs with name="id[]" are written to it, with values that are the ids of variants in the bundle. The first one will be the variant id of the main product. It will have an id of checkbox_XXXX where XXXX is the starting variant id of the main product. When different variant is chosen in the add bundle popup, this code:

      if(selector_id.indexOf("select-bottom") >= 0){
        $("#prod-bund-1 > .upsell li:first input").val(variant.id);
        $(".hide_product input:first").val(variant.id);
      }

in the `selectCallback` will set the value of that input to the chosen variant id

submits:
there's 3:

'Add Bundle 1':

  * Appears first. id#add-to-cart.
  * there's a product select above it in a hidden div
  * has class group_pro_3 if there are variants, else add_to_cart_bundle


'Add Bundle 3':

 * in the modal popup
 * also id#add-to-cart
 * class add_to_cart_bundle
 * the modal popup includes `bandle-popup`. This is a product form with select#product-select-bottom-{{product.id}}



javascript:

('.add_to_cart_bundle').on_click triggers ('.add_to_carts').click
  * this is the empty form


