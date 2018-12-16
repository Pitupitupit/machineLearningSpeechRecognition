<template>
  <div class="speechListItem">
    {{alternative}} weight:
    <input type="number" min="1" max="10" v-model="alternativeWeight">
  </div>
</template>

<script>
export default {
  name: "speech-list-item",
  data() {
    return {
      alternativeWeight: 0
    };
  }
};
</script>

<style scoped>
</style>
