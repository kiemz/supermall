import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'
import store from './store'

import FastClick from 'fastclick'

import toast from 'components/common/toast'
import lazyPlugin from 'vue3-lazy'
// import VueLazyload from 'vue-lazyload'


const app = createApp(App)
app.use(store)
app.use(router)
app.use(toast)
app.use(lazyPlugin, {
  loading: './assets/img/common/placeholder.png'
})
// app.use(VueLazyload,{})

FastClick.attach(document.body)

// src 换成 v-lazy
app.mount('#app')
app.config.globalProperties.$bus = new mitt()
