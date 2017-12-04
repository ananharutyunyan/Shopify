// jQuery (external)
// import svgxhr from 'webpack-svgstore-plugin/src/helpers/svgxhr'
 // eslint-disable
import $ from 'jquery'
import 'slick-carousel'
import numberConverter from 'number-to-words'

// Import main stylesheet
import '../sass/index.scss'

// Components
import setupSvgLoader from './components/svg-loader'
import './components/cart-update'
import './components/navicon'
import setupFilterMenus from './components/filter_toggle'
import sidebar from './components/sidebar'
import setupQueryParams from './components/query-params'
import setupTabs from './components/tabs'
import setupVideos from './components/videos'

// Products Page Components
import badges from './products/badges'
import selectCallback from './products/select-callback'
import setupTopReviewLink from './products/top-reviews-link'
import ProductSlider from './products/slider'
import cartInterstitial from './cart/interstitial'

// Testing
// import registerABLoader from './ab-testing/loader' # we need a head inserted entry point
// eslint-disable-next-line
const __svg__ = { path: '../svg/**/*.svg', name: 'icons.svg' }

// console.log('webpack js jQuery version:', $().jquery)
window.SP = window.SP || {}
const SP = window.SP
SP.selectCallback = selectCallback
window.toWords = numberConverter.toWords

$(() => {
  setupSvgLoader()
  setupQueryParams()
  SP.slider = new ProductSlider($('.product__slider-container'))
  SP.slider.setupZoomedOut()
  cartInterstitial.setup()
  badges.setup()
  sidebar.setup()
  setupTabs($('ul[data-tabs]'))
  setupTopReviewLink()
  setupFilterMenus()
  setupVideos()
})
