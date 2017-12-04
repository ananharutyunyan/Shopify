import $ from 'jquery'

export default function () {
  $('[data-svg-loader]').each(function _loadSvg() {
    const $this = $(this)
    $.get($this.data('svgLoader'), (svg) => {
      const svgSerialized = new window.XMLSerializer().serializeToString(svg.documentElement)
      this.innerHTML = svgSerialized
    })
  })
}
