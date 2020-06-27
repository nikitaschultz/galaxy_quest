<template lang="html">
  <div class="gameplay-container">
    <home :planets="planets" v-if="homeScreenViewGame" />
  </div>
</template>

<script>
import Home from './Home.vue';
import { eventBus } from '../../main.js';

export default {
  name: "gameplay-container",
  props: ["planets", "homeScreenViewGame"],
  components: {
    "home": Home
  },
  data(){
    return {
      selectedPlanet: null
    }
  },
  mounted(){
    eventBus.$on('planet-selected', (planet) => {
      this.selectedPlanet = planet;
    })
  }
}
</script>

<style lang="css" scoped>

  .gameplay-container {
    background-color: radial-gradient(midnightblue, indigo, black, black, black);
    width: 61vw;
    height: 75vh;
    margin: 0 0.5vw 0 0;
    box-shadow: 0 0 30px cornflowerblue;
  }

</style>
