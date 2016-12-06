import Vue from 'vue'
import Home from 'views/Home.vue'
import About from 'views/About.vue'

import VueRouter from 'vue-router'

Vue.use(VueRouter)
window.eventBus = new Vue()

const routes = [
  {path: '/', component: Home},
  {path: '/about', component: About}
]

const router = new VueRouter({
  routes
})
router.beforeEach( function(to, from, next) {
  window.scrollTo(0, 0)
  next()
})
const app = new Vue({
  router,
}).$mount('#app')
