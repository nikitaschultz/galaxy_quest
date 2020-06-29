<template lang="html">
  <div class="instruction-container">
    <home v-if="homeScreenViewInstructions" :activeProfile="activeProfile" />
    <sky-screen-instructions v-if="skyScreenStatus" :activeProfile="activeProfile" />
    <planet-instructions v-if="planetView" :selectedPlanet="selectedPlanet" />
  </div>
</template>

<script>
import ContinentSelectInstructions from './GameInstructions/ContinentSelectInstructions.vue';
import LandmarkPuzzleInstructions from './GameInstructions/LandmarkPuzzleInstructions.vue';
import SkyScreenInstructions from './SkyScreenInstructions.vue';
import PlanetInstructions from './PlanetInstructions.vue';
import Home from './Home.vue';
import { eventBus } from '../../main.js';

export default {
  name: "instruction-container",
  props: ["homeScreenViewInstructions", "activeProfile", "activeGame", "skyScreenStatus", "selectedPlanet", "planetView"],
  components: {
    "home": Home,
    "continent-select-instructions": ContinentSelectInstructions,
    "landmark-puzzle-instructions": LandmarkPuzzleInstructions,
    "sky-screen-instructions": SkyScreenInstructions,
    "planet-instructions": PlanetInstructions
  }
}
</script>

<style lang="css" scoped>

  .instruction-container {
    background-color: white;
    width: 23vw;
    height: 75vh;
    margin: 0 0 0 0.5vw;
    box-shadow: 0 0 30px cornflowerblue;
  }

</style>
