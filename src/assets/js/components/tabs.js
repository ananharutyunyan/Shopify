import $ from 'jquery'

export default function setupTabs($selector) {
  $selector.each(function _setupTabs() {
    const $menu = $(this)
    const $allTabs = $menu.find('> li > a')
    $allTabs.on('click', function _tabClick(event) {
      const $thisTab = $(this)
      const contentLocation = $thisTab.attr('href')
      if (contentLocation.charAt(0) === '#') {
        event.preventDefault()
        $allTabs.removeClass('active')
        $thisTab.addClass('active')
        $thisTab.parents('ul.tabs').next()
          .find(contentLocation)
          .show()
          .css({ display: 'block' })
          .addClass('active')
          .siblings()
          .hide()
          .removeClass('active')
      }
    })
  })
}
