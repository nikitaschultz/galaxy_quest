<template lang="html">
  <div class="game-instructions">
    <h2>Animal Memory Match</h2>
    <div v-if="resultPending">
      <div v-if="!ready">
        <p>The animal pairs have lost each other!</p>
        <p>Will you help bring them back together?</p>
      </div>
      <div v-if="ready">
        <p>Click a card to turn it over.</p>
        <p>If you turn over two matching cards, they will disappear, otherwise, they will turn back over.</p>
        <p>Keep matching until you've removed all the cards!</p>
        <div v-if="matchMade">
          <h3>Fun Fact:</h3>
          <p>{{ displayFact }}</p>
        </div>
      </div>
    </div>
    <div v-if="!resultPending">
      <div v-if="gameWon">
        <p>You did it!</p>
        <p>Among the cards we found this star!</p>
        <p>Please take it with you on your journeys!</p>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '@/main.js';

export default {
  name: "memory-match-instructions",
  data(){
    return {
      resultPending: true,
      ready: false,
      gameWon: false,
      matchMade: false,
      displayFact: ""
    }
  },
  mounted(){
    eventBus.$on('memory-match-game-loaded', (gameData) => {
      this.gameData = gameData
      this.ready = true;
    })

    eventBus.$on('memory-match-made', (card) => {
      this.matchMade = true;
      this.displayFact = card.facts[Math.floor(Math.random() * card.facts.length)]
    })

    eventBus.$on('game-won', () => {
      this.resultPending = false;
      this.gameWon = true;
    })
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
