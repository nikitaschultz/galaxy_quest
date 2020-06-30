<template lang="html">
  <div class="game-container">
    <button v-if="loading" v-on:click="loadInstructions" name="start-game" class="start-game-button">Let's Go!</button>
    <div v-if="!loading" v-for="card in gameCards" v-on:click="processSelect(card)">
      <div class="game-card" v-if="card.inPlay">
        <div v-if="!card.isSelected">
          <p class="card-back">?</p>
        </div>
        <div v-if="card.isSelected">
          <img v-bind:src="imageSRC(card)" alt="card-image">
        </div>
      </div>
      <div class="card-out" v-if="!card.inPlay">

      </div>
    </div>
  </div>
</template>

<script>
import AnimalsMatchService from '@/services/Games/AnimalsMatchService.js';
import { eventBus } from '@/main.js';

export default {
  name: "memory-match",
  data(){
    return {
      loading: true,
      gameCards: null,
      selectedCard: null,
      data: []
    }
  },
  mounted(){
    AnimalsMatchService.getAnimals()
    .then((res) => {
      const dataArray = this.shuffleArray(res);
      this.gameCards = [];
      for(let i = 0; i < 4; i++){
        let card = {
          image: dataArray[i].image,
          name: dataArray[i].name,
          facts: dataArray[i].facts,
          isSelected: false,
          inPlay: true
        };
        this.gameCards.push(card);
        card = {
          image: dataArray[i].image,
          name: dataArray[i].name,
          facts: dataArray[i].facts,
          isSelected: false,
          inPlay: true
        };
        this.gameCards.push(card);
        this.data.push(card);
      }
      this.gameCards = this.shuffleArray(this.gameCards);
    })
  },
  methods: {
    loadInstructions(){
      this.loading = false;
      eventBus.$emit('memory-match-game-loaded')
    },
    processSelect(card){
      if(!this.selectedCard){
        this.selectedCard = card;
        card.isSelected = true;
      }else{
        if(this.selectedCard.name === card.name){
          card.isSelected = true;
          setTimeout(() => {
            this.selectedCard.inPlay = false;
            card.inPlay = false;
            this.selectedCard = null;
            this.checkForWin();
            eventBus.$emit('memory-match-made', card)
          }, 1000)
        }else{
          card.isSelected = true;
          setTimeout(() => {
            this.selectedCard.isSelected = false;
            card.isSelected = false;
            this.selectedCard = null;
            this.checkForWin();
          }, 1500);
        }
      }
    },
    checkForWin(){
      let gameWin = this.gameCards.every((card) => {
        return card.inPlay === false
      })

      if(gameWin){
        eventBus.$emit('game-won')
        console.log("winner!!");
      }
    },
    shuffleArray(array){
      for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    },
    imageSRC(card){
      return require("@/assets/animals_match/" + card.image + ".png")
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
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  .game-card {
    background-color: midnightblue;
    width: 150px;
    height: 250px;
    margin: 10px;
    padding: 5px;
  }

  .game-card:hover {
    box-shadow: 0 0 20px gold;
  }

  .card-back {
    color: white;
    text-align: center;
    vertical-align: center;
    font-size: 12em;
    font-family: 'Boogaloo', cursive;
    margin: 0;
  }

  .card-out {
    background-color: none;
    width: 150px;
    height: 250px;
    margin: 10px;
    padding: 5px;
  }

</style>
