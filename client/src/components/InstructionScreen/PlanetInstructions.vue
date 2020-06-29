<template lang="html">
  <div class="planet-instructions">
    <h2>{{ selectedPlanet.title }}</h2>
    <hr />
    <div v-for="game in selectedPlanet.games">
      <h3>{{ game.name }}</h3>
      <p>{{ game.description }}</p><br>
      <button name="play-game" class="play-game-button">Play</button>
      <hr />
    </div><br>
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

  h3 {
    color: black;
    margin: 0
  }

  p {
    margin: 0;
    font-size: 20px;
  }

</style>
