<template>
</template>

<script>
import { HTTP } from '@/services/httpService'
let recognition
export default {
  name: 'display-command',
  data () {
    return {
      message: 'Speak command',
      maxAlternatives: 10,
      alternatives: [],
      backendTestData: []
    }
  },
  created () {
    window.SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition
    recognition = new window.SpeechRecognition()
    recognition.maxAlternatives = this.maxAlternatives;
    recognition.lang = 'pl-PL'
    recognition.onresult = event => {
      this.alternatives = Object.values(event.results[0]).map(
        alternative => alternative.transcript
      )
    }
  },
  methods: {
    captureSpeech: function () {
      recognition.start()
    }
  }
}
</script>

<style scoped>
</style>