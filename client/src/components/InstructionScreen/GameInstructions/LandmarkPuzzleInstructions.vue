<template lang="html">
  <div class="game-instructions">
    <div v-if="resultPending">
      <div v-if="!ready">
        <h2>World Landmarks</h2>
        <p>Let's take a trip to one of planet Earth's most amazing landmarks!</p><br>
        <p>It looks like the landmark's photo is all scrambled up.</p><br>
        <p>Explorer, will you help us put the pieces back in the right place?</p><br>
      </div>
      <div v-if="ready">
        <h2>{{ landmark.name }}</h2>
        <h3>{{ landmark.location }}</h3>
        <p>Click on two pieces of the puzzle to swap them!</p><br>
        <img :src="imageSRC" alt="landmark-image">
        <h3>Fun Fact:</h3>
        <p>{{ displayFact }}</p>
      </div>
    </div>
    <div v-if="!resultPending">
      <div v-if="gameWon">
        <h2>World Landmarks</h2>
        <p>Hooray!  You put the pieces back together!</p><br>
        <p>Thank you explorer!</p><br>
        <p>Amongst the pieces we found this star!</p><br>
        <p>Please take it as a token of our grattitude!</p>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '../../../main.js';

export default {
  name: "landmark-puzzle-instructions",
  data(){
    return {
      landmark: null,
      ready: false,
      resultPending: true,
      gameWon: false,
      displayFact: "",
      imageSRC: null
    }
  },
  mounted(){
    eventBus.$on('landmark-puzzle-game-loaded', (landmark) => {
      this.landmark = landmark;
      this.displayFact = this.landmark.facts[Math.floor(Math.random() * this.landmark.facts.length)]
    })

    eventBus.$on('landmark-puzzle-game-ready', () => {
      this.ready = true;
      this.imageSRC = require("@/assets/landmarkpuzzle/" + this.landmark.image + ".png")
    })

    eventBus.$on('landmark-puzzle-game-shuffle-fact', () => {
      this.displayFact = this.landmark.facts[Math.floor(Math.random() * this.landmark.facts.length)]
    })

    eventBus.$on('landmark-puzzle-game-won', () => {
      this.resultPending = false;
      this.gameWon = true;
    })
  }
}
</script>

<style lang="css" scoped>

.game-instructions {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

img {
  width: 18vw;
}

h3, h4 {
  margin: 0;
}

p {
  margin: 5px;
}

</style>
