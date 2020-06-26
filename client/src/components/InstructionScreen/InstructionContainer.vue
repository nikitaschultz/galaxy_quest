<template lang="html">
  <div class="instruction-container">
    <home v-if="homeScreenView" :activeProfile="activeProfile" />
  </div>
</template>

<script>
import Home from './Home.vue';

export default {
  name: "instruction-container",
  props: ["homeScreenView", "activeProfile", "activeGame"],
  components: {
    "home": Home
  }
}
</script>

<style lang="css" scoped>

  .instruction-container {
    background-color: blue;
    width: 23vw;
    height: 75vh;
    margin: 0 0 0 0.5vw;
  }

</style>
