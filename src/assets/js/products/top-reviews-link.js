import $ from 'jquery'

export default function () {
  $('.products__show-reviews').on('click', () => $('.product__tabs-reviews').trigger('click'))
}
