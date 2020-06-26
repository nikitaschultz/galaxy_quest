<template lang="html">
  <div class="">
    <img :src="planetSRC" :alt="planet.name" width="100px">
  </div>
</template>

<script>

export default {
  name: "planet",
  props: ["planet"],
  computed: {
    planetSRC(){
      return require("@/assets/" + this.planet.name + ".png")
    }
  }
}
</script>

<style lang="css" scoped>
</style>
