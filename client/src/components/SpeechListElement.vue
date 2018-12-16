<template>
  <div class="speechListElement">
    {{word}} weight:
    <input type="number" min="1" max="10" v-model="weight">
    <button @click="saveAlternative">Save</button>
  </div>
</template>

<script>
import { HTTP } from "@/services/httpService";
export default {
  name: "speech-list-element",
  props: ["word"],
  data() {
    return {
      weight: 0
    };
  },
  methods: {
    saveAlternative: () => {
      HTTP.post("/speechRecognition", {
        word: this.word,
        weight: this.weight
      })
        .then(result => result)
        .catch(error => error);
    }
  }
};
</script>

<style scoped>
</style>
