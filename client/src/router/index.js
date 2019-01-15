import Vue from 'vue'
import Router from 'vue-router'
import SpeechForm from '@/components/teach/SpeechForm'
import DisplayCommand from '@/components/display/displayCommand'
import LoginPage from '@/components/login/LoginPage'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'display-command',
      title: 'Command',
      component: DisplayCommand
    },
    {
      path: '/teach',
      name: 'speech-form',
      title: 'Teach',
      component: SpeechForm,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login-page',
      title: 'Login',
      component: LoginPage,
      meta: {
        guest: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!this.a.app.$session.exists()) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (!this.a.app.$session.exists()) {
      next()
    } else {
      next({
        path: '/'
      })
    }
  } else {
    next()
  }
})

export default router
