import $ from 'jquery'

const Shopify = window.Shopify

window.SP = window.SP || {}
const SP = window.SP

SP.currency_format = '${{amount}} USD' // eslint-disable-line no-template-curly-in-string

export default function selectCallback(variant, selector) {
  const productId = selector.product.id
  const $product = $(`#product-${productId}`)

  const featuredImage = variant && variant.featured_image

  const $notifyForm = $(`#notify-form-${productId}`)

  const $savePercent = $('.save-percent', $product)
  const $saveMoney = $('.save-money', $product)
  const $wasPrice = $('.was_price', $product)
  const $youPrice = $('.you-money', $product)
  const $currentPrice = $('.current_price', $product)
  const $productForm = $('.form.product_form', $product)
  const $soldOut = $('.sold_out', $product)
  const $topDeck = $('.top-deck', $product)
  const $bottomDeck = $('.bottom-deck', $product)
  const $freeShipping = $('.free_shipping', $product)
  const $addToCart = $('.add_to_cart', $product)
  const $vid = $('.vid', $product)

  const moneyFormat = $productForm.data('money-format')
  const savings = variant.compare_at_price - variant.price


  // Handle changing variant of main product in bundles
  $(`input#bundle_checkbox_${productId}`).val(variant.id)
  $(`input[data-bundle-input-product-id="${productId}"]`).val(variant.id)

  if (variant && featuredImage && $product.is(':visible')) {
    if (SP.slider) {
      SP.slider.gotoImageId(featuredImage.id)
    }

    const $imageElements = $('.combo-prod-selected .current-prod img').add('.ajax-success-modal img')
    $imageElements.each(function _imageSwitch() {
      Shopify.Image.switchImage(featuredImage, this)
    })
  }

  if (variant && variant.available) {
    if (variant.price < variant.compare_at_price) {
      $wasPrice.html(
        Shopify.formatMoney(variant.compare_at_price, moneyFormat)
      )
      $youPrice.text('You Save:')
      $saveMoney.html(
        Shopify.formatMoney(savings, SP.currency_format)
      )
      $savePercent.html(
        `(${Math.round((savings / variant.compare_at_price) * 100)}%)`
      )
    } else {
      $wasPrice.text('')
      $saveMoney.text('')
      $savePercent.text('')
      $youPrice.text('')
    }

    $soldOut.text('')
    $currentPrice.html(Shopify.formatMoney(variant.price, $productForm.data('money-format')))
    $vid.css('display', 'block')

    $freeShipping.css('display', 'block')
    $topDeck.css('display', 'block').text('Add to Cart')

    if (variant.price > 5999) {
      $bottomDeck.css('display', 'block')
    } else {
      $bottomDeck.css('display', 'none')
    }
    $addToCart.removeClass('disabled').removeAttr('disabled')
    $notifyForm.hide()
  } else {
    const message = variant ? SP.t.products.product.soldOut : SP.t.products.product.unavailable
    $wasPrice.text('')

    $currentPrice.text('')
    $vid.css('display', 'none')
    $freeShipping.css('display', 'none')

    $soldOut.text(message)
    $addToCart.addClass('disabled').attr('disabled', 'disabled').val(message)
    $topDeck.text('Sold Out')
    $bottomDeck.css('display', 'none')

    $notifyForm.fadeIn()
  }
}
