import $ from 'jquery'

class Badges {
  constructor() {
    this.overlayId = 'badges__overlay'
    this.overlayContainerId = 'badges__overlay_container'
    this.closeOverlayId = 'badges__close_overlay'
    this.closeButtonId = 'badges__close_button'
    this.popupId = 'badges__popup'

    this.$parking = $('#badges__modal_parking')
  }

  currentPopupOverlay() {
    return $(`#${this.overlayId}`)
  }

  setup() {
    $('.badges__btn_money, .badges__guarantee_banner').on('click', () => this.popup('#badges__guarantee_modal'))
    $('.badges__guarantee_box').on('click', () => this.popup('#badges__text_modal'))
  }

  popup(modalId) {
    this.closePopup().done(() => {
      $('body').append(
        `<table id="${this.overlayId}">
          <tr>
            <td id="${this.overlayContainerId}">
              <div id="${this.closeOverlayId}"></div>
              <div id="${this.popupId}">
                <a id="${this.closeButtonId}" href="javascript:void(0)"></a>
              </div>
            </td>
          </tr>
        </table>`
      )
      const $currentContent = $(modalId)
      $(`#${this.popupId}`).append($currentContent)
      $currentContent.fadeIn(400)

      $(`#${this.closeOverlayId}, #${this.closeButtonId}`).on('click', () => this.closePopup())

      $('body').addClass('modal-open')

      if (window.document.body.clientWidth < 780) {
        const currPosY = window.scrollY
        this.currentPopupOverlay().css('top', `${currPosY}px`)
      }
    })
  }


  closePopup() {
    const $currentPopupOverlay = this.currentPopupOverlay()
    const ready = $.Deferred()
    if ($currentPopupOverlay.length > 0) {
      const $currentContent = $('.badges__modal_content', $currentPopupOverlay)
      $currentContent.fadeOut(200, () => {
        this.$parking.append($currentContent)
        $currentPopupOverlay.remove()
        $('body').removeClass('modal-open')
        ready.resolve()
      })
    } else {
      ready.resolve()
    }
    return ready
  }

  handler(handler) {
    return $.proxy(handler, this)
  }
}

export default new Badges()

