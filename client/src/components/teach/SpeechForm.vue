<template>
<div class='form-container'>
<div class='properties-container'>
  <label for='alternatives'>Alternatives:</label>
  <input id='alternatives' type="number" min="1" max="10" v-model="maxAlternatives">
  <label for='lang'>Language:</label>
  <input id='lang' type="text" v-model="lang">
</div>
  <div class='speak-alternatives-container'>
    <img src="@/assets/logo.png">
    <div class="speechForm">
      <div>
        <button class='speak-button' @click="captureSpeech">{{message}}
          <font-awesome-icon icon="comment-dots" /></button>
      </div>
      <div>
        <div>Results:</div>
        <div v-for="(word, index) in alternatives" :key="index">
          <speech-list-element :word="word" :key="index"/>
        </div>
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
      message: 'Click and speak',
      maxAlternatives: 10,
      lang: 'pl-PL',
      alternatives: []
    }
  },
  created () {
    window.SpeechRecognition =
      window.webkitSpeechRecognition || window.SpeechRecognition
    recognition = new window.SpeechRecognition()
    recognition.maxAlternatives = this.maxAlternatives
    recognition.lang = this.lang
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

.form-container {
  display: flex;
}

.properties-container {
  flex: 10%;
  padding: 10px;
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
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    transition: color .15s;
    background-color: #42b983;
    color: #fff;
}
.speak-button:focus {outline:0;}

#lang, #alternatives {
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: .25rem;
  transition: border-color .15s;
}

</style>
