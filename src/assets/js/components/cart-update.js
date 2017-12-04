import $ from 'jquery'

$('.cart_form input[type="number"]').on('change', e => $(e.currentTarget).closest('form').submit())

export {}
