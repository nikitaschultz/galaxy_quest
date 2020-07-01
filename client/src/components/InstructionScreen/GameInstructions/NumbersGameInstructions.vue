<template lang="html">
  <div class="numbers-game-instructions">
    <h2>Count the Ducks </h2>
    <div v-if="resultPending">
      <div v-if="!ready">
        <p> All the star lights are doing strange things!</p>
        <p> Ducks keep appearing, can you help us count them ?</p>
      </div>
      <div v-if="ready">
        <p> We need your help to count the ducks! </p>
        <p> Can you help us?</p>
        <P> Click "Keep Going" until you score 3</p>
      </div>
    </div>
    <div v-if="!resultPending">
      <div v-if="!attemptsExhausted">
        <div v-if="gameWon">
          <p>Hooray! You've counted all the ducks!</p>
          <p>Thank you explorer!</p>
          <p>Please take this star with you as a token of our gratitude!</p>
        </div>
        <div v-if="!gameWon">
          <p>Oh no!  We can't find the star!</p>
          <p>Please try again & count all the ducks.</p>
          <p>Would you like to try again?</p>
          <button v-on:click="resetGame" name="button">Try Again</button>
        </div>
      </div>
      <div v-if="attemptsExhausted">
        <p>We couldn't count all the ducks to find a star.</p>
        <p>We'll find it next time!</p>
        <p>Would you like to play again?</p>
        <button name="reset-game" v-on:click="playAgain">Play Again</button>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '@/main.js';

export default {
  name: "numbers-game-instructions",
  data(){
    return {
      ready: false,
      resultPending: true,
      gameWon: false,
      attempts: 0,
      attemptsExhausted: false
      }
  },
  mounted(){
    eventBus.$on('numbers-game-ready', () =>{
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
    playAgain(){
      this.resetGame();
      this.attempts = 0;
      this.ready = false;
      eventBus.$emit('reset-numbers-game-select')
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
