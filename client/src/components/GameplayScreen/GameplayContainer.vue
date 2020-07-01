<template lang="html">
  <div class="gameplay-container">
    <div class="stars">
      <div v-if="!gameWinStatus">
        <div class="games" v-if="activeGame">
          <numbers-game v-if="activeGame.type === 'NumbersGame'"/>
          <continent-select v-if="activeGame.type === 'ContinentSelect'" />
          <picture-puzzle v-if="activeGame.type === 'PicturePuzzle'" />
          <memory-match v-if="activeGame.type === 'MemoryMatch'" />
          <animals-game v-if="activeGame.type === 'AnimalGame'" />
          <!-- <numbers-game v-if="activeGame.type === 'NumbersGame'" /> -->
        </div>
        <sky-screen v-if="skyScreenStatus" :activeProfile="activeProfile" />
        <home :planets="planets" v-if="homeScreenViewGame" />
      </div>
      <div v-if="gameWinStatus">
        <win-screen />
      </div>
    </div>
  </div>
</template>

<script>
import Home from './Home.vue';
import { eventBus } from '../../main.js';
import ContinentSelect from './Games/ContinentSelect.vue';
import PicturePuzzle from './Games/PicturePuzzle.vue';
import MemoryMatch from './Games/MemoryMatch.vue';
import NumbersGame from './Games/Numbers/App.vue';
import AnimalsGame from './Games/AnimalGame.vue'
import WinScreen from './WinScreen.vue';
import SkyScreen from './SkyScreen.vue';

export default {
  name: "gameplay-container",
  props: ["planets", "homeScreenViewGame", "gameWinStatus", "skyScreenStatus", "activeProfile", "activeGame"],
  components: {
    "home": Home,
    "continent-select": ContinentSelect,
    "picture-puzzle": PicturePuzzle,
    "memory-match": MemoryMatch,
    "win-screen": WinScreen,
    "sky-screen": SkyScreen,
    "numbers-game": NumbersGame,
    "animals-game": AnimalsGame
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
    background-image: radial-gradient(#340f4d, #060d4d, black, black);
    width: 61vw;
    height: 75vh;
    margin: 0 0.5vw 0 0;
    box-shadow: 0 0 30px cornflowerblue;
  }

  .stars {
    background: transparent url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/stars.png');
    height: 75vh;
    width: 61vw;
  }

</style>
