 import Toast from './Toast'
 import { createApp } from 'vue'

 const obj = {}

 obj.install = function(app) {
  //  console.log(Vue);
  //  const toastConstrustor = Vue.extend(Toast)
  // console.log(app);
  const toastConstrustor = createApp(Toast)
  const parent = document.createElement('div')
  const toast = toastConstrustor.mount(parent)
  document.body.appendChild(toast.$el)

  app.config.globalProperties.$toast = toast
  // app.prototype.$toast = toast
 } 



 export default obj