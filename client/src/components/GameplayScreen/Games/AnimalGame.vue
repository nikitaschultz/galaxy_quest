<template lang="html">
  <div class="game-container">
    <div>
    <button v-if="loading" v-on:click="loadInstructions" name="start-game" class="start-game-button">Let's Go!</button>
  </div>

    <div v-if="!loading && animalObjects" class="row">
      <div class="column">
        <p> Remaining lives : {{this.playerLives}}</p>
        <img v-if="!showImage[0]" v-bind:src="imageOneShadow" v-bind:name="this.animalObjects[0].name" v-on:click="handleClickOne">
        <img v-if="showImage[0]" v-bind:src="imageOne" v-bind:name="this.animalObjects[0].name">
        <img v-if="!showImage[1]" v-bind:src="imageTwoShadow" v-bind:name="this.animalObjects[1].name" v-on:click="handleClickTwo">
        <img v-if="showImage[1]" v-bind:src="imageTwo" v-bind:name="this.animalObjects[1].name">
      </div>
      <div class="column">
        <img v-if="!showImage[2]" v-bind:src="imageThreeShadow" v-bind:name="this.animalObjects[2].name" v-on:click="handleClickThree">
        <img v-if="showImage[2]" v-bind:src="imageThree" v-bind:name="this.animalObjects[2].name">
        <img v-if="!showImage[3]" v-bind:src="imageFourShadow" v-bind:name="this.animalObjects[3].name" v-on:click="handleClickFour">
        <img v-if="showImage[3]" v-bind:src="imageFour" v-bind:name="this.animalObjects[3].name">
      </div>
      <div class="column">
        <p v-if="this.selectedAnswer != this.solution">Where is the {{this.solution}}?</p>
        <p v-if="this.selectedAnswer === this.solution">Well done! You found the {{this.solution}}!</p>
      </div>
      <div class="column">
        <button v-if="this.selectedAnswer && this.selectedAnswer != this.solution && this.playerLives != 0" type="button" name="button" v-on:click="handleTryAgain">Try Again</button>
        <button v-if="this.selectedAnswer === this.solution && this.gameRound != 3" type="button" name="button" v-on:click="handleNextRound">Next Round</button>
        <button v-if="this.selectedAnswer === this.solution && this.gameRound === 3" type="button" name="button" v-on:click="handleGameOver">Finish</button>
        <button v-if="this.selectedAnswer && this.selectedAnswer != this.solution && this.playerLives === 0 " type="button" name="button">Game Over</button>
      </div>
    </div>
  </div>
</template>

<script>
import {eventBus} from '@/main.js';
import AnimalGameService from '@/services/AnimalGameService.js'
import ProfileService from '@/services/ProfileService.js'

export default {
  name: 'animal-game',
  props: ["activeProfile"],
  data(){
    return {
      // loading
      loading: true,
      // result of mounted fetch
      animalObjects: null,
      // the players answer
      selectedAnswer: "",
      /// round counter
      gameRound: 1,
      /// lives counter
      playerLives: 3,
      /// hash tag picture logic
      showImage: [false,false,false,false]
    }
  },

  mounted(){
    this.fetchGameData();


    eventBus.$on('reset-animalGame-select', () => {
      this.loading = true;
      this.handleNextRound();
  })
},

  methods: {
    fetchGameData(){
      AnimalGameService.getAnimals()
      .then (data => this.animalObjects = this.shuffleArray(data))
    },
    shuffleArray(array){
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    },

    /////Game logic ////

    handleClickOne(){
      if(!this.selectedAnswer){
        this.selectedAnswer = this.animalObjects[0].name;
        this.showImage[0] = true;
      }
    },
    handleClickTwo(){
      if(!this.selectedAnswer){
        this.selectedAnswer = this.animalObjects[1].name;
        this.showImage[1] = true;
      }
    },
    handleClickThree(){
      if(!this.selectedAnswer){
        this.selectedAnswer = this.animalObjects[2].name;
        this.showImage[2] = true;
      }
    },
    handleClickFour(){
      if(!this.selectedAnswer){
        this.selectedAnswer = this.animalObjects[3].name;
        this.showImage[3] = true;
      }
    },
    handleTryAgain(){
      this.selectedAnswer = "";
      this.playerLives --;
      this.showImage.forEach((item,index) => {
        this.showImage[index] = false;
      });
    },
    handleNextRound(){
      this.gameRound ++;
      this.selectedAnswer = "";
      this.showImage.forEach((item,index) => {
        this.showImage[index] = false;
      });
      this.fetchGameData();
    },

    ///// WIN STATE /////

    handleGameOver(){
      if(this.selectedAnswer === this.solution){
        eventBus.$emit('game-won')
      }else{
        eventBus.$emit('game-lost')
      }
    },

    // Game loading screen
    loadInstructions(){
      eventBus.$emit('animal-game-loaded', this.solution)
      this.loading = false

      ////////////////////
    }
  },
  computed: {
    ///Display images (options)
    imageOne(){
      return require("@/assets/animals/" + this.animalObjects[0].name.toLowerCase() + ".jpg")
    },
    imageTwo(){
      return require("@/assets/animals/" + this.animalObjects[1].name.toLowerCase() + ".jpg")
    },
    imageThree(){
      return require("@/assets/animals/" + this.animalObjects[2].name.toLowerCase() + ".jpg")
    },
    imageFour(){
      return require("@/assets/animals/" + this.animalObjects[3].name.toLowerCase() + ".jpg")
    },
    imageOneShadow(){
      return require("@/assets/animals/" + this.animalObjects[0].name.toLowerCase() + "_shadow.jpg")
    },
    imageTwoShadow(){
      return require("@/assets/animals/" + this.animalObjects[1].name.toLowerCase() + "_shadow.jpg")
    },
    imageThreeShadow(){
      return require("@/assets/animals/" + this.animalObjects[2].name.toLowerCase() + "_shadow.jpg")
    },
    imageFourShadow(){
      return require("@/assets/animals/" + this.animalObjects[3].name.toLowerCase() + "_shadow.jpg")
    },
    ///Generate the answer to the game
    solution: function(){
      let answerIndex = Math.floor(Math.random() * 4);
      return this.animalObjects[answerIndex].name;
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
}
  .row {
    display: flex;
    flex-wrap: wrap;
    padding: 0 4px;
  }

  /* Create two equal columns that sits next to each other */
  .column {
    flex: 50%;
    padding: 0 4px;
  }

  .column img {
    margin-top: 8px;
    vertical-align: middle;
  }

</style>
