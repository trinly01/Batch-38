import { boot } from 'quasar/wrappers'

import wings from 'wings4'
const $wingsApp = wings('http://localhost:3030')

import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  // something to do

  app.config.globalProperties.$wingsApp = $wingsApp
  app.config.globalProperties.$pdfMake = pdfMake
  // console.log('pogi', app.config.globalProperties)

  app.use(VueChartkick)
})
