<template lang="html">
  <div class="planet">
    <img :src="planetSRC" :alt="planet.name" width="100px" v-on:click="handleSelectPlanet" :class="planet.name">
  </div>
</template>

<script>
import { eventBus } from '../../main.js';

export default {
  name: "planet",
  props: ["planet"],
  computed: {
    planetSRC(){
      return require("@/assets/" + this.planet.name + ".png")
    }
  },
  methods: {
    handleSelectPlanet(){
      eventBus.$emit('planet-selected', this.planet)
    }
  }
}
</script>

<style lang="css" scoped>

  .geography {
    margin: 10vh 5vw;
  }

  .animals {
    margin: 50vh 5vw;
  }

  .numbers {
    margin: 30vh 5vw;
  }

  .planet:hover {
    filter: drop-shadow(0 0 10px gold);
  }


</style>
