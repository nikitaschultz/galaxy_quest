<template lang="html">
  <div class="instruction-container">
    <home v-if="homeScreenViewInstructions" :activeProfile="activeProfile" />
    {{tester}}
  </div>
</template>

<script>
import Home from './Home.vue';
import { eventBus } from '../../main.js';

export default {
  name: "instruction-container",
  props: ["homeScreenViewInstructions", "activeProfile", "activeGame"],
  data(){
    return {
      selectedPlanet: null,
      tester: "<p> Test </p>"
    }
  },
  components: {
    "home": Home
  },
  mounted(){
    eventBus.$on('planet-selected', (planet) => {
      this.selectedPlanet = planet;
    })
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
