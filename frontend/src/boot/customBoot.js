import { boot } from 'quasar/wrappers'

import wings from 'wings4'
const $wingsApp = wings('http://localhost:3030')

import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  // something to do

  app.config.globalProperties.$wingsApp = $wingsApp
  // console.log('pogi', app.config.globalProperties)

  app.use(VueChartkick)
})
