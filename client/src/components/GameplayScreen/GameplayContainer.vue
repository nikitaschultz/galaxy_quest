<template lang="html">
  <div class="gameplay-container">
    <div v-if="!gameWinStatus">
      <sky-screen v-if="starScreenStatus" :activeProfile="activeProfile" />
      <home :planets="planets" v-if="homeScreenViewGame" />
    </div>
    <div v-if="gameWinStatus">
      <win-screen />
    </div>
  </div>
</template>

<script>
import Home from './Home.vue';
import { eventBus } from '../../main.js';
import ContinentSelect from './Games/ContinentSelect.vue';
import LandmarkPuzzle from './Games/LandmarkPuzzle.vue';
import WinScreen from './WinScreen.vue';
import SkyScreen from './SkyScreen.vue';

export default {
  name: "gameplay-container",
  props: ["planets", "homeScreenViewGame", "gameWinStatus", "starScreenStatus", "activeProfile"],
  components: {
    "home": Home,
    "continent-select": ContinentSelect,
    "landmark-puzzle": LandmarkPuzzle,
    "win-screen": WinScreen,
    "sky-screen": SkyScreen
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
    background-image: radial-gradient(indigo, midnightblue, black, black);
    width: 61vw;
    height: 75vh;
    margin: 0 0.5vw 0 0;
    box-shadow: 0 0 30px cornflowerblue;
  }

</style>
