<template lang="html">
  <div class="home-gameplay">
    <planet v-for="(planet, index) in planets" :planet="planet" :key="index" />
  </div>
</template>

<script>
import Planet from './Planet.vue';

export default {
  name: "home",
  props: ["planets"],
  components: {
    "planet": Planet
  }
}
</script>

<style lang="css" scoped>

  .home-gameplay {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

</style>
