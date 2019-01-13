<template>
  <div class="speechListElement">
    <div class='phrase'>"{{word}}"</div>
    <div class='hint-score'>
      weight:
      <input type="number" min="1" max="10" v-model="weight">
      <button @click="saveAlternative">Save</button>
    </div>
  </div>
</template>

<script>
import { HTTP } from '@/services/httpService'
export default {
  name: 'speech-list-element',
  props: ['word'],
  data () {
    return {
      weight: 0
    }
  },
  methods: {
    saveAlternative: function () {
      HTTP.post('/speechRecognition', {
        word: this.word,
        weight: this.weight
      })
        .then(result => result)
        .catch(error => error)
    }
  }
}
</script>

<style scoped>
  .speechListElement {
    padding: 20px;
  }
  .phrase {
    font-size: 1.3rem;
    line-height: 1.5;
  }

  .hint-score {
    display: inline-block;
  }
</style>
