<template>
  <div class="speechForm">
    <div>
      <button class='speak-button' @click="captureSpeech">{{message}}
        <font-awesome-icon icon="comment-dots" /></button>
    </div>
    <div class="alternatives-input">
      <div>We display {{maxAlternatives}} alternatives, You can change it</div>
      <input type="number" min="1" max="10" v-model="maxAlternatives">
    </div>
    <div>
      <div>Results:</div>
      <div v-for="(word, index) in alternatives" :key="index">
        <speech-list-element :word="word" :key="index"/>
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from '@/services/httpService'
import SpeechListElement from '@/components/SpeechListElement'
let recognition
export default {
  name: 'speech-form',
  components: {
    'speech-list-element': SpeechListElement
  },
  data () {
    return {
      message: 'Click and speak',
      maxAlternatives: 10,
      alternatives: [],
      backendTestData: []
    }
  },
  created () {
    HTTP.get('/speechRecognition')
      .then(response => (this.backendTestData = response.data))
      .catch(error => error)
    window.SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition
    recognition = new window.SpeechRecognition()
    recognition.maxAlternatives = this.maxAlternatives
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
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.alternatives-input {
  display: inline-flex;
  padding: 20px;
}

.speak-button {
  font-size: 1.5em;
  border: none;
  border-radius: 10%;
  padding: 20px;
  background-color: #41B883;
}

</style>
