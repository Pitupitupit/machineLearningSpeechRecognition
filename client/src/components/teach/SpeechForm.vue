<template>
<div class='form-container'>
<div class='settings-container'>
  <h1>Settings</h1>
  <label for='alternatives'>Alternatives:</label>
  <input id='alternatives' type="number" min="1" max="10" v-model="maxAlternatives">
  <label for='lang'>Phrases language:</label>
  <input id='lang' type="text" v-model="lang">
</div>
  <div class='speak-alternatives-container'>
    <img src="@/assets/logo.png">
    <div class="speechForm">
      <div>
        <button class='speak-button' @click="captureSpeech">{{message}}
          <font-awesome-icon icon="comment-dots" /></button>
      </div>
      <div v-for="(word, index) in alternatives" :key="index">
        <speech-list-element :word="word" :key="index"/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import SpeechListElement from './SpeechListElement'
let recognition
export default {
  name: 'speech-form',
  components: {
    'speech-list-element': SpeechListElement
  },
  data () {
    return {
      message: 'Speak and teach',
      maxAlternatives: 10,
      lang: 'pl-PL',
      alternatives: []
    }
  },
  created () {
    window.SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition
    recognition = new window.SpeechRecognition()
    recognition.onresult = event => {
      this.alternatives = Object.values(event.results[0]).map(
        alternative => alternative.transcript
      )
    }
  },
  methods: {
    captureSpeech: function () {
      recognition.maxAlternatives = this.maxAlternatives
      recognition.lang = this.lang
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

.form-container {
  display: flex;
}

.settings-container {
  flex: 10%;
  padding: 10px;
}

.settings-item {
  width: 100%;
  display: inline-flex;
}

.speak-alternatives-container {
  flex: 90%;
  text-align: center;
}

.alternatives-input {
  display: inline-flex;
  padding: 20px;
}

.speak-button {
  font-size: 1.5rem;
}

#lang, #alternatives {
  width: 100%;
}
</style>
