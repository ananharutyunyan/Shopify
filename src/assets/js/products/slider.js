
import $ from 'jquery'
import 'slick-carousel'
import '@fancyapps/fancybox'
import 'ez-plus'

function sliderArrow(direction, size) {
  const template = `
  <svg class="product__arrow product__arrow-${size} product__arrow-${direction}">
    <use xlink:href="#icon-thin-${direction}"></use>
  </svg>
  `
  return template
}


const defaultLargeOptions = {
  slidesToShow: 1,
  slidesToScroll: 1,
  lazyLoad: 'progressive',
  infinite: true,
  asNavFor: '.product__slider',
  arrows: true,
  centerMode: true,
  centerPadding: '0px',
  speed: 150,
  fade: true,
  useCss: true,
  autoplay: false,
  touchThreshold: 20,
  respondTo: 'min',
  focusOnChange: true,
  prevArrow: sliderArrow('prev', 'large'),
  nextArrow: sliderArrow('next', 'large')
}
const defaultNavOptions = {
  slidesToScroll: 4,
  lazyLoad: 'progressive',
  infinite: true,
  asNavFor: '.product__slider',
  accessibility: true,
  draggable: false,
  focusOnChange: false,
  dots: false,
  speed: 150,
  centerMode: true,
  centerPadding: '0px',
  focusOnSelect: true,
  vertical: false,
  swipeToSlide: true,
  swipe: true,
  touch: true,
  touchThreshold: 8,
  mobileFirst: true,
  verticalSwiping: false,
  respondTo: 'min',
  prevArrow: sliderArrow('prev', 'small'),
  nextArrow: sliderArrow('next', 'small'),
  slidesToShow: 4
}


const defaultZoomOptions = {
  borderColour: '#cc4477',
  zoomWindowFadeIn: 300,
  zoomWindowFadeOut: 300,
  lensFadeIn: 300,
  lensFadeOut: 300,
  responsive: false,
  zoomWindowOffsetX: 20,
  zoomWindowOffsetY: 10
}

export default class ProductSlider {
  constructor($elm, largeOptions = {}, navOptions = {}, zoomOptions = {}) {
    this.$elm = $elm

    if ($elm.length) {
      this.$largeSlider = $('.product__slider-large', $elm)
      this.$navSlider = $('.product__slider-nav', $elm)
    }

    this.largeOptions = Object.assign(defaultLargeOptions, largeOptions)
    this.navOptions = Object.assign(defaultNavOptions, navOptions)
    this.zoomOptions = Object.assign(defaultZoomOptions, zoomOptions)
  }

  hasSlider() {
    return this.$elm.length
  }

  setupZoomedOut($elm) {
    if (this.hasSlider()) {
      $('body').append('<style id="lightbox-animations" type="text/css"></style>')
      this.$lightboxAnimations = $('#lightbox-animations')

      this.slickOn()

      const $imgs = $('.product__slider-large .product__image-slide', $elm)
      $imgs.on('click', this.handler(this.fancyboxHandler))

      this.setupFancybox()
      this.addEzOnSlideChange(null, this.$largeSlider.slick('getSlick'), null, 0)

      $(window).on('resize', this.handler(this.handleResize))

      console.log('setup hover handler')
      $('.menu').hover(this.handler(this.disableCurrentZoom), this.handler(this.enableCurrentZoom))
    }
  }


  setupZoom($elm) {
    const currentWidth = $(window).width()
    const options = Object.assign({}, this.zoomOptions)
    if (currentWidth > 767) {
      if (currentWidth < 960) {
        Object.assign(options, {
          zoomWindowWidth: 310,
          zoomWindowHeight: 310
        })
      } else if (currentWidth < 1152) {
        Object.assign(options, {
          zoomWindowWidth: 400,
          zoomWindowHeight: 400
        })
      } else {
        Object.assign(options, {
          zoomWindowWidth: 465,
          zoomWindowHeight: 510,
          zoomWindowOffsetY: 20
        })
      }
      $elm.ezPlus(options)
    }
  }

  slickOn() {
    this.$largeSlider.slick(this.largeOptions)
    this.$largeSlider.on('beforeChange', this.handler(this.addEzOnSlideChange))
    this.$navSlider.slick(this.navOptions)
    this.$navSlider.on('breakpoint', this.handler(this.slickBreakpoint))
  }

  slickOff() {
    this.$largeSlider.slick('unslick')
    this.$navSlider.slick('unslick')
  }

  static currentSlideImg(slick, slide) {
    return $(slick.$slides.get(slide)).find('img')
  }

  addEzOnSlideChange(event, slick, currentSlide, nextSlide) {
    if (currentSlide !== nextSlide) {
      if (Number.isFinite(currentSlide)) {
        const $currentImg = ProductSlider.currentSlideImg(slick, currentSlide)
        const currentEz = $currentImg.data('ezPlus')
        ProductSlider.teardownEzPlus($currentImg, currentEz)
      }
      if (Number.isFinite(nextSlide)) {
        const $nextImg = $(slick.$slides.get(nextSlide)).find('img')
        if (!$nextImg.data('ezPlus')) {
          this.setupZoom($nextImg)
        }
      }
    }
  }

  slickBreakpoint(event, slick) {
    this.addEzOnSlideChange(null, slick, null, slick.currentSlide)
  }

  handleResize() {
    const currentWidth = this.$navSlider.width()
    const navSlick = this.$navSlider.slick('getSlick')

    if (currentWidth > 720) {
      navSlick.setOption('slidesToShow', 8, true)
    } else if (currentWidth > 630) {
      navSlick.setOption('slidesToShow', 7, true)
    } else if (currentWidth > 540) {
      navSlick.setOption('slidesToShow', 6, true)
    } else if (currentWidth > 450) {
      navSlick.setOption('slidesToShow', 5, true)
    } else {
      navSlick.setOption('slidesToShow', 4, true)
    }

    const largeSlick = this.$largeSlider.slick('getSlick')
    const currentSlide = largeSlick.currentSlide
    const $currentImg = ProductSlider.currentSlideImg(largeSlick, currentSlide)
    if ($(window).width() < 768) {
      const currentEz = $currentImg.data('ezPlus')
      ProductSlider.teardownEzPlus($currentImg, currentEz)
    } else if (!$currentImg.data('ezPlus')) {
      this.setupZoom($currentImg)
    }
  }

  static teardownEzPlus($img, ez) {
    if (ez) {
      ez.destroy()
      $img.data('ezPlus', null)
    }
  }

  setupFancybox() {
    const $fancyboxGroup = window.$('[data-fancybox="product-images"]')

    $fancyboxGroup.fancybox({
      loop: false,
      toolbar: true,
      buttons: ['close'],
      arrows: false,
      infobar: true,
      animationEffect: 'fade',
      animationDuration: 200,
      transitionEffect: 'slide',
      transitionDuration: 300,
      idleTime: null,
      hash: false,
      thumbs: {
        autoStart: true
      },
      margin: [44, 0, 90, 0],
      afterClose: this.handler(this.fancyBoxCloseHandler),
      btnTpl: {
        close: '<button data-fancybox-close class="fancybox-button fancybox-button__back" title="Back"><span class="lt">&lt;</span>Back</button>'
      }
    })
  }

  handler(handler) {
    return $.proxy(handler, this)
  }

  fancyBoxCloseHandler() {
    this.slickOn()
    $('#olark-wrapper').show()
        // this.setupFancybox()
  }

  fancyboxHandler(event) {
    if ($(window).width() > 767) {
      event.stopImmediatePropagation()
      return false
    }
    $('#olark-wrapper').hide()
    $('.trustedsite-floating-element').hide()

    this.slickOff()
    return true
  }

  gotoImageId(imageId) {
    if (this.$navSlider.hasClass('slick-initialized')) {
      const $img = $(`[data-image-id="${imageId}"]`, this.$navSlider)
      const slideIx = $img.closest('.slick-slide').data('slick-index')
      // Unfortunately this bug: https://github.com/kenwheeler/slick/issues/2269
      // prevents us from using fade. Unless we use it always.
      this.$largeSlider.slick('slickSetOption', 'cssEase', 'linear')
      this.$largeSlider.slick('slickSetOption', 'fade', true)
      this.$navSlider.slick('slickGoTo', slideIx)
      this.$largeSlider.slick('slickSetOption', 'cssEase', 'ease')
      this.$largeSlider.slick('slickSetOption', 'fade', false)
    }
  }

  enableCurrentZoom() {
    console.log('enable current zoom')
    const largeSlick = this.$largeSlider.slick('getSlick')
    const currentSlide = largeSlick.currentSlide
    const $currentImg = ProductSlider.currentSlideImg(largeSlick, currentSlide)
    this.setupZoom($currentImg)
  }

  disableCurrentZoom() {
    console.log('disable current zoom')
    const largeSlick = this.$largeSlider.slick('getSlick')
    const currentSlide = largeSlick.currentSlide
    const $currentImg = ProductSlider.currentSlideImg(largeSlick, currentSlide)
    const currentEz = $currentImg.data('ezPlus')
    ProductSlider.teardownEzPlus($currentImg, currentEz)
  }
}
