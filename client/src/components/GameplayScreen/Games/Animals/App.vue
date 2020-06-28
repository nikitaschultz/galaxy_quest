<template lang="html">
  <div v-if="animalObjects" class="row">
    <div class="column">
      <img v-bind:src="imageOne">
      <img v-bind:src="imageTwo">
    </div>
    <div class="column">
      <img v-bind:src="imageThree">
      <img v-bind:src="imageFour">
    </div>
    <div class="column">
      <p>Where is the {{this.answer}}?</p>
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
      answer: null,

      // the expected answer
      solution: null
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
    }
  },
  computed: {

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
