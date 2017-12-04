import $ from 'jquery'

window.SP = window.SP || {}
const SP = window.SP

class CartInterstitial {

  constructor() {
    this.$upsellLinks = $('a.atc[data-variant-id]')
    this.$addToCartLinks = $('form[data-triggers-cart-interstitial] .atc')

    this.$productContainer = $('.product-container')
    this.$cartInterstitial = $('#cart-interstitial')

    this.$addedItems = this.$cartInterstitial.find('.cart-intr__added .items')
    this.$errors = this.$cartInterstitial.find('.cart-intr__errors')
    this.$recentProducts = this.$cartInterstitial.find('.cart-intr__added-prod')
    this.$recentHeader = this.$cartInterstitial.find('.cart-intr__added')
    this.$recentHeaderItems = this.$cartInterstitial.find('.cart-intr__added .items')

    this.$cartTotal = $('.cart-intr__cart-total', this.$cartInterstitial)
    this.$cartItems = $('.cart-intr__cart-items', CartInterstitial.$cartInterstitial)

    this.$cartCounters = $('.cart-count, .cart-count-0')

    this.addToCartEndpoint = '/cart/add.js'

    this.$loaderTemplate = '<div class="cart-interstitial-loader"><i class="fa fa-spinner fa-pulse fa-5x fa-fw"></i><span class="sr-only">Loading...</span></div>'
  }

  setup() {
    this.$upsellLinks.on('click', this.handler(this.handleUpsellAdd))

    $(window).on('popstate', this.handler(this.handleClose))

    this.$addToCartLinks.on('click', this.handler(this.handleAddToCart))
  }

  static scrollToTop() {
    $('html, body').animate({
      scrollTop: 0
    }, 500)
  }

  static numProductsInForm($form) {
    console.log('numProductsInForm', $form, $form.find('input[name="id[]"]'), $form.find('select[name="id"]'), $form.find('input[name="id"]').filter(':hidden'))
    const productsInInputs = $form.find('input[name="id[]"]').length
    const productsInSelects = $form.find('select[name="id"]').length
    const productsInHiddenFields = $form.find('input[name="id"]').filter(':hidden').length

    return productsInInputs + productsInSelects + productsInHiddenFields
  }

  static itemsText(num, showWasWhere) {
    let items = (num === 1) ? 'item' : 'items'
    items = `${num} ${items}`
    if (showWasWhere) {
      const wasWere = (num === 1) ? 'was' : 'were'
      items = `${items} ${wasWere}`
    }
    return items
  }

  setAddedItemsTotal(total) {
    this.$addedItems.text(CartInterstitial.itemsText(total, true))
  }

  slideInRecentHeader() {
    this.$recentHeader.addClass('slide-in-right').removeClass('slide-out-right')
  }

  slideOutRecentHeader() {
    this.$recentHeader.addClass('slide-out-right').removeClass('slide-in-right')
  }

  displayError(error) {
    this.$errors.show().text(error)
  }

  hideErrors() {
    this.$errors.hide()
  }

  showRecent() {
    this.$recentHeader.show()
    this.$recentProducts.show()
  }

  hideRecent() {
    this.$recentHeader.hide()
    this.$recentProducts.hide()
  }

  handleClose() {
    if (this.$cartInterstitial) {
      this.$cartInterstitial.hide()
      $('.cart-interstitial-loader').remove()
      this.$productContainer.hide().fadeIn(300)
    }
  }

  handleAddToCart(event) {
    const $target = $(event.target)
    const $form = $target.closest('form')
    event.preventDefault()

    // disable ez Zoom
    if (SP.slider) {
      SP.slider.disableCurrentZoom()
    }

    // for when we are coming from a bundle popup
    $('body').removeClass('overlay_popup')

    CartInterstitial.scrollToTop()


    this.$productContainer.prepend(
      $(this.$loaderTemplate).hide().fadeIn(300, () => window.history.pushState(null, null, null))
    )

    this.setAddedItemsTotal(CartInterstitial.numProductsInForm($form))

    this.hideErrors()

    $.post(this.addToCartEndpoint, $form.serialize(), () => {}, 'json')
    .fail((xhr) => {
      console.log('cart/add fail')
      const data = JSON.parse(xhr.responseText)
      this.hideRecent()
      this.displayError(data.description)
    })
    .done(() => this.showRecent())
    .always(() => {
      this.updateCartWidget().done(() => {
        $('.cart-interstitial-loader').remove()
        this.$productContainer.hide()
        this.$cartInterstitial.hide().fadeIn(300)
      })
    })
  }

  handleUpsellAdd(event) {
    event.preventDefault()
    const $target = $(event.target)
    const variantId = $target.data('variantId')
    const compareAtPrice = $target.data('compareAtPrice')

    CartInterstitial.scrollToTop()

    this.$recentProducts.fadeOut(400)
    this.slideOutRecentHeader()

    $.post('/cart/add.js', {
      quantity: 1,
      id: variantId
    }, null, 'json')
    .fail((xhr, status, error) => {
      console.log('upsell add to cart FAIL')
      console.log('status: ', status)
      console.log('error: ', error)
      const data = JSON.parse(xhr.responseText)
      console.log('data', data)
      this.$recentProducts.hide()
      this.$recentHeader.hide()
      this.displayError(data.description)
    })
    .done((product) => {
      this.$recentHeaderItems.text(CartInterstitial.itemsText(1, true))
      this.$recentHeader.show()
      this.$errors.hide()

      this.populateProduct(this.$recentProducts, product, product.id, false, compareAtPrice)
      this.$recentProducts.fadeIn(400)
      this.updateCartWidget()
    })
  }

  updateCartWidget() {
    return $.getJSON('/cart.js', (cart) => {
      this.slideInRecentHeader()
      this.$cartTotal.text(cart.total_price / 100)
      this.$cartItems.text(CartInterstitial.itemsText(cart.item_count))
      this.$cartCounters.text(cart.item_count)
    })
  }

  populateProduct($template, product, variantId, withCart, compareAtPrice) {
    const title = product.title || product.productTitle
    $('.cart-intr__prod-thumb', $template).attr('src', product.featured_image || product.image)
    $('.cart-intr__prod-title', $template).text(title).attr('href', product.url).attr('title', title)

    const priceAsFixed = (product.price / 100).toFixed(2)
    $('.cart-intr__amount', $template).text(`$${priceAsFixed}`)
    let wasPrice = compareAtPrice || 0
    if (product.compare_at_price) {
      wasPrice = product.compare_at_price
    }

    if (wasPrice > product.price) {
      wasPrice = (compareAtPrice / 100).toFixed(2)
      $('.was_price', $template).text(`$${wasPrice}`)
    } else {
      $('.was_price', $template).text('')
    }


    if (withCart) {
      $('.atc', $template)
        .data('variant-id', variantId)
        .on('click', this.handler(this.handleUpsellAdd))
    }
  }

  handler(handler) {
    return $.proxy(handler, this)
  }

}


export default new CartInterstitial()
