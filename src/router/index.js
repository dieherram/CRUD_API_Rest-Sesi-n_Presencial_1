import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import firebase from "firebase";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta :{
      loguin: true
    },
    alias: ['/home']
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (Loguin.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let user = firebase.auth().currentUser
  let isAuthrequired = to.matched.some (route => route.meta.loguin)
  //debugger
  if(!user && isAuthrequired) {
    next('/login')
  } else {
    next()
  }
})

export default router
