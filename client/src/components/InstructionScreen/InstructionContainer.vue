<template lang="html">
  <div class="instruction-container">
    <div class="instructions">
      <home v-if="homeScreenViewInstructions" :activeProfile="activeProfile" />
      <div class="game-instructions" v-if="activeGame">
        <continent-select-instructions v-if="activeGame.type === 'ContinentSelect'" />
        <picture-puzzle-instructions v-if="activeGame.type === 'PicturePuzzle'" />
        <numbers-game-instructions v-if="activeGame.type === 'NumbersGame'" />
        <animal-game-instructions v-if="activeGame.type === 'AnimalGame'" />
        <memory-match-instructions v-if="activeGame.type === 'MemoryMatch'" />
      </div>
      <sky-screen-instructions v-if="skyScreenStatus" :activeProfile="activeProfile" />
    </div>
    <planet-instructions v-if="planetView" :selectedPlanet="selectedPlanet" />
    <div class="home-button" v-if="!homeScreenViewInstructions">
      <button type="button" name="button" v-on:click="handleHomeButtonClick">Home</button>
    </div>
  </div>
</div>
</template>

<script>
import ContinentSelectInstructions from './GameInstructions/ContinentSelectInstructions.vue';
import PicturePuzzleInstructions from './GameInstructions/PicturePuzzleInstructions.vue';
import MemoryMatchInstructions from './GameInstructions/MemoryMatchInstructions.vue';
import NumbersGameInstructions from './GameInstructions/NumbersGameInstructions.vue';
import SkyScreenInstructions from './SkyScreenInstructions.vue';
import PlanetInstructions from './PlanetInstructions.vue';
import AnimalGameInstructions from './GameInstructions/AnimalGameInstructions.vue'

import Home from './Home.vue';
import { eventBus } from '../../main.js';

export default {
  name: "instruction-container",
  props: ["homeScreenViewInstructions", "activeProfile", "activeGame", "skyScreenStatus", "selectedPlanet", "planetView", "activeGame"],
  components: {
    "home": Home,
    "continent-select-instructions": ContinentSelectInstructions,
    "picture-puzzle-instructions": PicturePuzzleInstructions,
    "memory-match-instructions": MemoryMatchInstructions,
    "numbers-game-instructions": NumbersGameInstructions,
    "sky-screen-instructions": SkyScreenInstructions,
    "planet-instructions": PlanetInstructions,
    "animal-game-instructions": AnimalGameInstructions
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
  }

  .home-button {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    height: 100%;
    margin: 10px;
  }

</style>
