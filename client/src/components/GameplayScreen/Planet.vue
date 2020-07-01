<template lang="html">
  <div v-on:click="handleSelectPlanet" class="planet">
    <img :src="planetSRC" :alt="planet.name" width="80px" :id="planet.name">
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
    handleSelectPlanet(event){
      eventBus.$emit('planet-selected', this.planet);
    }
  }
}
</script>

<style lang="css" scoped>

  #geography {
    margin: 20vh 6.5vw;

    -webkit-animation: myOrbit1 9s linear infinite;
  }

  #animals {
    margin: 50vh 6.5vw;

    -webkit-animation: myOrbit2 7.5s linear infinite;
  }

  #numbers {
    margin: 40vh 6.5vw;

    -webkit-animation: myOrbit3 6s linear infinite;
  }

  .planet:hover, .selected-planet:hover {
    filter: drop-shadow(0 0 10px gold);
  }

  .selected-planet {
    filter: drop-shadow(0 0 10px gold);
  }


  @-webkit-keyframes myOrbit1 {
    from { -webkit-transform: rotate(0deg) translateX(40px) rotate(0deg); }
    to   { -webkit-transform: rotate(360deg) translateX(40px) rotate(-360deg); }
  }

  @-webkit-keyframes myOrbit2 {
    from { -webkit-transform: rotate(360deg) translateX(40px) rotate(-360deg); }
    to   { -webkit-transform: rotate(0deg) translateX(40px) rotate(-0deg); }
  }

  @-webkit-keyframes myOrbit3 {
    from { -webkit-transform: rotate(180deg) translateX(50px) rotate(-180deg); }
    to   { -webkit-transform: rotate(-180deg) translateX(50px) rotate(180deg); }
  }



</style>
