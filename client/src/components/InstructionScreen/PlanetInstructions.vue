<template lang="html">
  <div class="planet-instructions">
    <h2>{{ selectedPlanet.title }}</h2>
    <div v-for="game in selectedPlanet.games">
      <h3>{{game.name}}</h3>
      <button name="play-game">Play</button>
    </div>
    <button type="button" name="button" v-on:click="handleHomeButtonClick">Home</button>
  </div>
</template>

<script>
import { eventBus } from "@/main.js";

export default {
  name: "planet-instructions",
  props: ["selectedPlanet"],
  methods: {
    handleHomeButtonClick(){
      eventBus.$emit('home-view');
    }
  }
}
</script>

<style lang="css" scoped>

  .planet-instructions {
    text-align: center;
  }

</style>
