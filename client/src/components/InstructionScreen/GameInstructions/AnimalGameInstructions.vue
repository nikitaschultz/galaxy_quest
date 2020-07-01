<template lang="html">
  <div class="game-instructions">
    <h2>Who's there ?</h2>
    <div v-if="resultPending">
      <div v-if="!ready">
        <p>Oh no! It's so dark here!</p>
        <p>Without starlight, we dont know who the animals are.</p>
        <p>Will you help us find them?</p>
      </div>
      <div v-if="ready">
        <p>Where is the  {{ correctAnswer }}?</p>
        <p>Please click on the {{ correctAnswer }} so we know where he is!</p>
      </div>
    </div>
    <div v-if="!resultPending">
      <div v-if="!attemptsExhausted">

        <div v-if="roundWon">
          <p>Hooray!  We found the {{correctAnswer}}!</p>
          <p>Keep going and we will try to find the others!</p>
          <button  v-on:click="playAgain" name="button">Next Round</button>
        </div>

        <div v-if="gameWon">
          <p>Hooray!  We found them!</p>
          <p>Thank you explorer!</p>
          <p>Please take this star with you as a token of our gratitude!</p>
        </div>


        <div v-if="!gameWon && !roundWon">
          <p>Oh no!  We can't find the star!</p>
          <p>That was the wrong continent.</p>
          <p>The star is in {{ correctAnswer }}.</p>
          <p>Would you like to try again?</p>
          <button v-on:click="resetGame" name="button">Try Again</button>
        </div>
      </div>
      <div v-if="attemptsExhausted">
        <p>We couldn't find the {{correctAnswer}}.</p>
        <p>Looks like it was too hidden.</p>
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
  name: "animal-game-instructions",
  data(){
    return {
      correctAnswer: "",
      ready: false,
      resultPending: true,
      roundWon: false,
      gameWon: false,
      rounds: 0,
      attempts: 0,
      attemptsExhausted: false,
    }
  },
  mounted(){
    eventBus.$on('animal-game-loaded', (correctAnswer) => {
      this.correctAnswer = correctAnswer;
      this.ready = true;
    })

    eventBus.$on('round-won', () => {
      this.rounds ++;
      if(this.rounds == 3){
        eventBus.$emit('game-won')
      }else{
      this.resultPending = false;
      this.roundWon = true;
    }
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
      this.roundWon = false;
      this.resultPending = true;
    },
    playAgain(){
      this.resetGame();
      this.attempts = 0;
      this.ready = false;
      eventBus.$emit('reset-animalGame-select')
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
