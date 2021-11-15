import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import {Row,Col,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Main,
  Tabs,TabPane} from 'element-ui'
import Vuesax from 'vuesax'
import 'boxicons';
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

import 'vuesax/dist/vuesax.css' //Vuesax styles

const i18n = new VueI18n({
  locale: 'en',  
  messages: {
    'zh': require('./locales/zh'),
    'en': require('./locales/en')
  }
})

Vue.component(Main.name,Main)
Vue.component(Row.name,Row)
Vue.component(Col.name,Col)
Vue.component(Dropdown.name,Dropdown)
Vue.component(DropdownMenu.name,DropdownMenu)
Vue.component(DropdownItem.name,DropdownItem)
Vue.component(Tabs.name,Tabs)
Vue.component(TabPane.name,TabPane)
Vue.use(Vuesax, {
  // options here
})

Vue.config.productionTip = false


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
