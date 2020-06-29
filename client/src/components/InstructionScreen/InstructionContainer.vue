<template lang="html">
  <div class="instruction-container">
    <div class="instructions">
      <home v-if="homeScreenViewInstructions" :activeProfile="activeProfile" />
      <div class="game-instructions" v-if="activeGame">
        <continent-select-instructions v-if="activeGame.type === 'ContinentSelect'" />
        <picture-puzzle-instructions v-if="activeGame.type === 'PicturePuzzle'" />
      </div>
      <sky-screen-instructions v-if="skyScreenStatus" :activeProfile="activeProfile" />
      <planet-instructions v-if="planetView" :selectedPlanet="selectedPlanet" />
    </div>
    <div class="home-button" v-if="!homeScreenViewInstructions">
      <button type="button" name="button" v-on:click="handleHomeButtonClick">Home</button>
    </div>
  </div>
</template>

<script>
import ContinentSelectInstructions from './GameInstructions/ContinentSelectInstructions.vue';
import PicturePuzzleInstructions from './GameInstructions/PicturePuzzleInstructions.vue';
import SkyScreenInstructions from './SkyScreenInstructions.vue';
import PlanetInstructions from './PlanetInstructions.vue';
import Home from './Home.vue';
import { eventBus } from '../../main.js';

export default {
  name: "instruction-container",
  props: ["homeScreenViewInstructions", "activeProfile", "activeGame", "skyScreenStatus", "selectedPlanet", "planetView", "activeGame"],
  components: {
    "home": Home,
    "continent-select-instructions": ContinentSelectInstructions,
    "picture-puzzle-instructions": PicturePuzzleInstructions,
    "sky-screen-instructions": SkyScreenInstructions,
    "planet-instructions": PlanetInstructions
  },
  methods: {
    handleHomeButtonClick(){
      eventBus.$emit('home-view')
    }
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .home-button {
    display: flex;
    justify-content: center;
    padding: 10px;
  }

</style>
