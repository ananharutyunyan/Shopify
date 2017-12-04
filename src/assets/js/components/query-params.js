export default function () {
  window.Shopify = window.Shopify || {}
  if (!window.Shopify.queryParams) {
    window.Shopify.queryParams = {}
    if (window.location.search.length) {
      const pairs = window.location.search.substr(1).split('&')
      for (let i = 0; i < pairs.length; i += 1) {
        const [key, value] = pairs[i].split('=')
        if (value !== undefined) {
          window.Shopify.queryParams[decodeURIComponent(key)] = decodeURIComponent(value)
        }
      }
    }
  }
}
