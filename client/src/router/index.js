import Vue from 'vue'
import Router from 'vue-router'
import SpeechForm from '@/components/SpeechForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'speech-form',
      component: SpeechForm
    }
  ]
})
