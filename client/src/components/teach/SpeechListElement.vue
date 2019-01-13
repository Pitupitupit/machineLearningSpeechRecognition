<template>
  <div class="speechListElement">
    <label>{{word}} weight:</label>
    <input type="number" min="1" max="10" v-model="weight">
    <button @click="saveAlternative">Save</button>
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
input {
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
