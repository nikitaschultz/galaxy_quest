<template lang="html">
  <div class="game-instructions">
    <h2>World Continents</h2>
    <div v-if="resultPending">
      <div v-if="!ready">
        <p>Planet Earth needs your help!</p>
        <p>A star has fallen and we can't find it!</p>
        <p>Will you help us?</p>
      </div>
      <div v-if="ready">
        <p>The star has fallen into {{ correctAnswer }}!</p>
        <p>Please will you click on the continent of {{ correctAnswer }} so we know where to look!</p>
      </div>
    </div>
    <div v-if="!resultPending">
      <div v-if="gameWon">
        <p>Hooray!  We found it!</p>
        <p>Thank you explorer!</p>
        <p>Please take this star with you as a token of our gratitude!</p>
      </div>
      <div v-if="!gameWon">
        <p>Oh no!  We can't find the star!</p>
        <p>Looks like that was the wrong continent.</p>
        <p>Would you like to try again?</p>
        <button v-on:click="resetGame" name="button">Try Again</button>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '../../../main.js';

export default {
  name: "continent-select-instructions",
  data(){
    return {
      correctAnswer: "",
      ready: false,
      resultPending: true,
      gameWon: false
    }
  },
  mounted(){
    eventBus.$on('continent-select-game-loaded', (correctAnswer) => {
      this.correctAnswer = correctAnswer;
      this.ready = true;
    })

    eventBus.$on('continent-select-game-won', () => {
      this.resultPending = false;
      this.gameWon = true;
    })

    eventBus.$on('continent-select-game-lost', () => {
      this.resultPending = false;
    })
  },
  methods: {
    resetGame(){
      this.gameWon = false;
      this.resultPending = true;
    }
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

</style>
