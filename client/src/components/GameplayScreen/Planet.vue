<template lang="html">
  <div class="">
    <img :src="planetSRC" :alt="planet.name" width="100px" v-on:click="handleSelectPlanet">
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
</style>
