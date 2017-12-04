window.SP = window.SP || {}
const SP = window.SP
SP.abTests = SP.abTests || {}
const AB = SP.abTests
const convert = window.convert

export default function (testName, convertId) {
  AB[testName] = AB[testName] || {}
  const test = AB[testName]
  if (!test.loader) {
    test.loader = function abLoader() {
      const currentData = convert.currentData
      console.log('currentData: ', currentData)
      if (currentData.experiments[convertId] === undefined) {
        console.log(`experiment ${testName} (id: ${convertId}) not found. Registering jquery ready to hide loader & show original`)
        convert.$(() => {
          const $loading = convert.$(`.ab__loader[data-ab-test=${testName}]`)
          const $original = convert.$(`.ab__variation[data-ab-test=${testName}][data-ab-variation=0]`)
          console.log('hiding loading:', $loading)
          console.log('showing: ', $original)
          $loading.hide()
          $original.show()
        })
      } else {
        console.log(`found experiment ${testName} (id: ${convertId})`)
      }
    }

    const convertQueue = window._conv_q || [] // eslint-disable-line
    convertQueue.push([test.loader])
  }
}
