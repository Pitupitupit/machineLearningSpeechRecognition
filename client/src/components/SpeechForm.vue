<template>
  <div class="speechForm">
    <div>
      <button v-on:click="captureSpeech">{{message}}</button>
    </div>
    <div class="alternativesInput">
      <div>We display {{maxAlternatives}} alternatives, You can change it</div>
      <input type="number" min="1" max="10" v-model="maxAlternatives">
    </div>
    <div>
      <div>Results:</div>
      {{alternatives}}
      <speech-list-item
        v-for="(alternative, index) in alternatives"
        alternative="alternative"
        :key="index"
      />
    </div>
    <div>Backend test:
      <ul>
        <li
          v-for="backendTest in backendTestData"
          :key="backendTest._id"
        >{{backendTest.word}} {{backendTest.weight}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { HTTP } from "../services/httpService.js";
export default {
  name: "SpeechForm",
  data() {
    return {
      message: "Click and speak",
      maxAlternatives: 10,
      alternatives: [],
      backendTestData: []
    };
  },
  created() {
    HTTP.get("/speechRecognition")
      .then(response => (this.backendTestData = response.data))
      .catch(error => error);
    this.setupSpeechRecognition();
  },
  methods: {
    setupSpeechRecognition: () => {
      window.SpeechRecognition =
        window.webkitSpeechRecognition || window.SpeechRecognition;
    },
    captureSpeech: () => {
      const recognition = new window.SpeechRecognition();
      recognition.maxAlternatives = this.maxAlternatives;
      recognition.start();
      recognition.onresult = event => {
        this.alternatives = Object.values(event.results[0]).map(
          alternative => alternative.transcript
        );
      };
      recognition.onspeechend = () => recognition.stop();
    }
  }
};
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
.alternativesInput {
  display: inline-flex;
  padding: 20px;
}
</style>
