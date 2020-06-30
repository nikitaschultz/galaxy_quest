<template lang="html">
  <div v-bind:class="isSelected" v-on:click="handleSelectPlanet" >
    <img :src="planetSRC" :alt="planet.name" width="80px" :class="planet.name">
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
    },
    isSelected(){
      return this.planet.isSelected ? "selected-planet" : "planet"
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
    margin: 10vh 6.5vw;
  }

  .animals {
    margin: 50vh 6.5vw;
  }

  .numbers {
    margin: 30vh 6.5vw;
  }

  .planet:hover {
    filter: drop-shadow(0 0 10px gold);
  }

  .selected-planet {
    filter: drop-shadow(0 0 10px gold);
  }


</style>
