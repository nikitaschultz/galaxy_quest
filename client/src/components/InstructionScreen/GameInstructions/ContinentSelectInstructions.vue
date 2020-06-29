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
        <p>Please click on the continent of {{ correctAnswer }} so we know where to look!</p>
      </div>
    </div>
    <div v-if="!resultPending">
      <div v-if="!attemptsExhausted">
        <div v-if="gameWon">
          <p>Hooray!  We found it!</p>
          <p>Thank you explorer!</p>
          <p>Please take this star with you as a token of our gratitude!</p>
        </div>
        <div v-if="!gameWon">
          <p>Oh no!  We can't find the star!</p>
          <p>That was the wrong continent.</p>
          <p>The star is in {{ correctAnswer }}.</p>
          <p>Would you like to try again?</p>
          <button v-on:click="resetGame" name="button">Try Again</button>
        </div>
      </div>
      <div v-if="attemptsExhausted">
        <p>We couldn't find the star.</p>
        <p>It fell in {{ correctAnswer }} which is the {{ colourCodes[correctAnswer] }} continent on the map.</p>
        <p>We'll find it next time!</p>
        <p>Would you like to play again?</p>
        <button name="reset-game" v-on:click="playAgain">Play Again</button>
      </div>
    </div>
    <button type="button" name="button" v-on:click="handleHomeButtonClick">Home</button>
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
      gameWon: false,
      attempts: 0,
      attemptsExhausted: false,
      colourCodes: {
        "Africa": "red",
        "Oceania": "pink",
        "Europe": "green",
        "Asia": "yellow",
        "The Americas": "blue"
      }
    }
  },
  mounted(){
    eventBus.$on('continent-select-game-loaded', (correctAnswer) => {
      this.correctAnswer = correctAnswer;
      this.ready = true;
    })

    eventBus.$on('game-won', () => {
      this.resultPending = false;
      this.gameWon = true;
    })

    eventBus.$on('game-lost', () => {
      this.attempts += 1;
      if(this.attempts > 2){
        this.attemptsExhausted = true;
      }
      this.resultPending = false;
    })
  },
  methods: {
    resetGame(){
      this.gameWon = false;
      this.resultPending = true;
    },
    handleHomeButtonClick(){
      eventBus.$emit('home-view');
    },
    playAgain(){
      this.resetGame();
      this.attempts = 0;
      this.ready = false;
      eventBus.$emit('reset-continent-select')
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
