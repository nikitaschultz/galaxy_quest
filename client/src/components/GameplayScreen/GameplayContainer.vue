<template lang="html">
  <div class="gameplay-container">
    <home :planets="planets" v-if="homeScreenView" />
  </div>
</template>

<script>
import Home from './Home.vue';

export default {
  name: "gameplay-container",
  props: ["planets", "homeScreenView"],
  components: {
    "home": Home
  },
  data(){
    selectedPlanet: null
  }
}
</script>

<style lang="css" scoped>

  .gameplay-container {
    background-color: blue;
    width: 61vw;
    height: 75vh;
    margin: 0 0.5vw 0 0;
  }

</style>
