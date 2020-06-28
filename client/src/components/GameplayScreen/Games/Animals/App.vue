<template lang="html">
  <div v-if="animalObjects" class="row">
    <div class="column">
      <img v-bind:src="imageOne" v-bind:name="this.animalObjects[0].name" v-on:click="handleClickOne">
      <img v-bind:src="imageTwo" v-bind:name="this.animalObjects[1].name" v-on:click="handleClickTwo">
    </div>
    <div class="column">
      <img v-bind:src="imageThree" v-bind:name="this.animalObjects[2].name" v-on:click="handleClickThree">
      <img v-bind:src="imageFour" v-bind:name="this.animalObjects[3].name" v-on:click="handleClickFour">
    </div>
    <div class="column">
      <p>Where is the {{this.solution}}?</p>
    </div>
  </div>
</template>

<script>
import {eventBus} from './main.js';
import AnimalGameService from './service/AnimalGameService.js'

export default {
  data(){
    return {
      // result of mounted fetch
      animalObjects: null,
      // the players answer
      playerAnswer: "",
    }
  },
  mounted(){
    this.fetchGameData();

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
      this.playerAnswer = this.animalObjects[0].name;
    },
    handleClickTwo(){
      this.playerAnswer = this.animalObjects[1].name;
    },
    handleClickThree(){
      this.playerAnswer = this.animalObjects[2].name;
    },
    handleClickFour(){
      this.playerAnswer = this.animalObjects[3].name;
    },

    ////////////////////
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
    ///Generate the answer to the game
    solution: function(){
      let answerIndex = Math.floor(Math.random() * this.animalObjects.length);
      return this.animalObjects[answerIndex].name;
    }
  }
}
</script>

<style lang="css" scoped>

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
