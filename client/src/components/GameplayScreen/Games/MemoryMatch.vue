<template lang="html">
  <div class="game-container">
    <button v-if="loading" v-on:click="loadInstructions" name="start-game" class="start-game-button">Let's Go!</button>
    <div class="game-card" v-if="!loading" v-for="card in gameCards" v-on:click="toggleSelected(card)">
      <div v-if="!card.isSelected">
        <p class="card-back">?</p>
      </div>
      <div v-if="card.isSelected">
        <p>face up</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "memory-match",
  data(){
    return {
      loading: true,
      gameCards: [],
      selectedCard: null
    }
  },
  mounted(){
    this.gameCards.push({
      value: "elephant",
      isSelected: false
    },
    {
      value: "elephant",
      isSelected: false
    },
    {
      value: "elephant",
      isSelected: false
    },
    {
      value: "elephant",
      isSelected: false
    },
    {
      value: "elephant",
      isSelected: false
    },
    {
      value: "elephant",
      isSelected: false
    })
  },
  methods: {
    loadInstructions(){
      this.loading = false;
    },
    toggleSelected(card){
      card.isSelected = !card.isSelected
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
    width: 20%;
    height: 40%;
    margin: 5px;
    display: flex;
    flex-direction: center;
    justify-content: center;
  }

  .game-card:hover {
    
  }

  .card-back {
    color: white;
    text-align: center;
    font-size: 200px;
    font-family: 'Boogaloo', cursive;
    margin: 0;
  }

</style>
