<template lang="html">
  <div class="game-container">
    <button v-if="loading" v-on:click="loadInstructions"> Click to count the ducks </button>
    <div v-if="!loading">
      <div class = "duck-container" v-if="this.score < 3 && this.lives > 0">
        <img v-for= "(each,index) in item" src="@/assets/number_game_images/rubber_duck.jpg" width = "90" height = "90" :alt="each" :key="index">
      </div>
      <!-- Check the player's choice with the correct answer -->
      <div class ="guess-buttons-container">
        <button v-for="(answer, index) in answers" :key="index-3" v-on:click="checkAnswer(answer)"> {{answer}} </button>
      </div>
    </div>
    <!-- if game is still in-play, then  player can have another shot -->
    <div class="another-go-button" v-if="this.score > 0 && this.score < 3 ||   this.lives < 3 && this.lives > 0" >
    </br>
    </br>
      <button v-on:click="startGame"> Keep going to win a star! </button>
    </div>
    <!-- Update with the score & lives  -->
    <div class = "scoreboard-container">
      <button> Score: {{this.score}}</button>
      <button> Lives: {{this.lives}}</button>
    </div>
    <!-- If player's score reaches 3 -->
    <div class = "game-status-container">
      <div v-if="this.score === 3">
        <h3> Well done you've won a star!! </h3>
        <button type="button" name="button" v-on:click="gameWon"> Click to claim your star </button>
      </div>
      <div v-if="this.lives === 0">
        <h3> Bad luck, why not visit another plant? </h3>
        <button type="button" name="button" v-on:click="anotherGame"> Try another game! </button>
      </div>
    </div>
  </div>
</template>

<script>

import ProfileService from '@/services/ProfileService.js'
import {eventBus} from '@/main.js';

export default {
    name: 'numbers-game',
    props: ['activeProfile'],
  data() {
    return {
      loading: true,
      item:[],
      answers:[],
      number: 0,
      answer: 0,
      score: 0,
      lives: 3
    }
  },
  mounted(){
    eventBus.$on('reset-numbers-game-select',()=> {
      this.loading = true;
    })
  },
  methods: {
    loadInstructions(){
      eventBus.$emit('numbers-game-ready');
      this.loading = false;
      this.startGame();
    },
    startGame(){
      this.loading = false;
      this.number = this.randomNumber();
      this.createItemArray();
      this.createAnswersArray();
      this.shuffleArray(this.answers);
    },
    anotherGame(){
      eventBus.$emit('home-view')
    },
    randomNumber() {
      const randomNumber = Math.floor((Math.random()*20)+1);
      return randomNumber;
    },
    createItemArray(){
      this.item= [];
      for (let i = 0; i< this.number; i++) {
        this.item.push(i);
      }
    },
    createAnswersArray(){
      this.answers= [];
      this.answers.push(this.number)
      while (this.answers.length < 3) {
        let newAnswer = this.randomNumber();
        if (!this.answers.includes(newAnswer)){
          this.answers.push(newAnswer);
          }
        }
      },
    shuffleArray(answers){
      var currentIndex = answers.length,
      temporaryValue, randomIndex;
      while(0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = answers[currentIndex];
        answers[currentIndex] = answers[randomIndex];
        answers[randomIndex] = temporaryValue;
      }
      return answers;
    },
    checkAnswer(answer) {
      if (this.lives > 0 && this.score < 3){
        if (answer === this.number){
          this.score++;
        }
        else {
          this.lives--;
        }
      }
    },
    gameWon() {
        eventBus.$emit('game-won')
    }
  }
}
</script>

<style lang="css" scoped>

.game-container {
  background-color: white;
  height: 75vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.duck-container{
  position: absolute;
  top: 5px;
  left: 10px;

  }

.scoreboard-container{
  position:absolute;
  bottom: 0px;
  right: 0px;

}
.guess-buttons-container{
  position: absolute;
  bottom: 0px;
  left: 10px;
}

.another-go-button{

}


</style>
