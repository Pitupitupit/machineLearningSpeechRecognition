<template>
<div class='display-container'>
<div class='settings-container'>
  <h2>Settings</h2>
  <label for='lang'>Command language:</label>
  <input id='lang' type="text" v-model="lang">
</div>
  <div class='speak-container'>
    <img src="@/assets/logo.png">
    <div class="speechForm">
      <div>
        <button class='speak-button' @click="captureSpeech">{{message}}
          <font-awesome-icon icon="comment-dots" /></button>
      </div>
      <div class='command'>
          "{{this.alternatives[0]}}"
      </div>
    </div>
  </div>
</div>
</template>

<script>
let recognition
export default {
  name: 'display-command',
  data () {
    return {
      message: 'Say command',
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

.display-container {
  display: flex;
}

.settings-container {
  flex: 10%;
  padding: 10px;
}

.speak-container {
    flex: 90%;
    text-align: center;
}

.settings-item {
  width: 100%;
  display: inline-flex;
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

.command {
  padding: 20px;
  color: #42b983;
  font-size: 3rem;
}
</style>
