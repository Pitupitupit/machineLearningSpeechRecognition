import Vue from 'vue'
import Router from 'vue-router'
import SpeechForm from '@/components/teach/SpeechForm'
import DisplayCommand from '@/components/display/displayCommand'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'speech-form',
      title: 'Teach',
      component: SpeechForm
    },
    {
      path: '/main',
      name: 'display-command',
      title: 'Command',
      component: DisplayCommand
    }
  ]
})
