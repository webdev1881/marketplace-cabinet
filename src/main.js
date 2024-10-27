import Vue from 'vue'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/ru-RU'
import locale from '@/languages/ua'

import VueI18n from 'vue-i18n'

import "@/utils/vee-validate";

import '@/styles/index.scss'
import '@/styles/element-variables.scss'


import App from './App'
import store from './store'
import router from './router'

import '@/icons'

import '@/permission'

import dateFilter from './filters/date.filter'
import orderFilter from './filters/orderdate.filter'
import splitNumberFilter from './filters/splitNumber.filter'
import localizeFilter from '@/filters/localize.filter'

import components from '@/components/UI'
import './registerServiceWorker'
components.forEach( component => {
  Vue.component( component.name, component )
} )

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(ElementUI, { locale })

Vue.use(VueI18n)

Vue.filter('date', dateFilter)
Vue.filter('orderDate', orderFilter)
Vue.filter('splitNumber', splitNumberFilter)
Vue.filter('localize', localizeFilter)


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
