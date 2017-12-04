import $ from 'jquery'

class Sidebar {
  constructor() {
    this.$toggleButton = $('.toggleBtn')
  }

  setup() {
    this.$toggleButton.on('click', () => {
      $(this).children('.icon-minus-circled, .icon-plus').toggleClass('icon-minus-circled icon-plus')
    })
  }
}

export default new Sidebar()
