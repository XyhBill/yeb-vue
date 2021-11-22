import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { postRequest, putRequest, getRequest, deleteRequest } from "./utils/api";
import { initMenu } from './utils/menus'

Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.prototype.postRequest = postRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.getRequest = getRequest
Vue.prototype.deleteRequest = deleteRequest

router.beforeEach((to, from, next) => {
//   if (window.sessionStorage.getItem('tokenStr')) {
    initMenu(router,store);
    next();
//   } else {
//     next()
//   }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
