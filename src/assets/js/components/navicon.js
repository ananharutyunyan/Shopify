import $ from 'jquery'

$('.navicon_button').on('click', () => $('.toggle_menu').toggle())
$(window).resize(() => {
  const width = $(window).width()
  if (width >= 768) {
    $('.toggle_menu').hide()
  }
})

export {}
