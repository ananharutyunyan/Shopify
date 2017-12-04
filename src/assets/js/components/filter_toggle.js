import $ from 'jquery'

export default function () {
  $('.filter-toggle').on('click', () => {
    const $menu = $('.filter-menu')
    $menu.slideToggle('slow')
    $menu.toggleClass('closed')
  })

  $(window).resize(() => {
    const width = $(window).width()
    if (width < 768) {
      $('.filter-menu.closed').hide()
    } else {
      $('.filter-menu').show()
    }
  })

  $('.toggle').click(function _clickToggle(e) {
    if ($(window).width() <= 767) {
      const $toggle = $(this)
      if ($toggle.next('.toggle_list').is(':visible')) {
        $toggle.next('.toggle_list').hide()
        $toggle.children('span').html('+')
      } else {
        $toggle.next('.toggle_list').show()
        $toggle.children('span').html('&ndash;')
      }
    }
    e.preventDefault()
    return false
  })

  $('.nav-material-select, .nav-vendor-select').on('change', function _navChange() {
    const $select = $(this)
    const currentSelected = $select.val()
    const collectionHandle = $select.data('collection-handle')
    const newLocation = `${window.location.origin}/collections/${collectionHandle}/${currentSelected}`
    window.location = newLocation
  })
}
