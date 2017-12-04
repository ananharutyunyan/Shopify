import $ from 'jquery'

const endpoint = 'https://vimeo.com/api/oembed.json'

export default function setupVideos() {
  console.log('==========> setupVideos')
  const $videos = $('.product__video-frame')
  $videos.each(function _setupVideo() {
    const $frame = $(this)
    console.log('setup one video', $frame)
    const url = $frame.data('src')
    const width = $frame.width()

    console.log('get data for', url, width)

    $.getJSON(endpoint, { url, width })
    .done((data) => {
      console.log('got data from vimeo', data)
      const heightPercent = (data.height / data.width) * 100
      $frame.html(`<span class="product__video-height" style="padding-top: ${heightPercent}%;"></span>`)
      $frame.append(data.html)
    })
  })
}
