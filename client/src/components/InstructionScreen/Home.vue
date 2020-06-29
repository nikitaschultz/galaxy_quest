<template lang="html">
  <div class="home-instructions">
    <h2>Welcome explorer!</h2>
    <p>Click on any planet to continue on your quest!</p>
    <div class="profile">
      <h3>{{ activeProfile.name }}</h3>
      <img v-bind:src="avatarSRC" alt="avatar-picture" height="100px">
      <div v-if="activeProfile.starPoints > 0">
        <h4>Star Points: {{ activeProfile.starPoints }}</h4>
        <p>Want to add some stars to the constellations in your sky?</p>
        <button v-on:click="showSkyScreen" type="button" name="button">Add Stars!</button>
      </div>
      <div v-if="!activeProfile.starPoints">
        <p>You don't have any stars to add to your sky.</p>
        <p>Play a game to earn some more!</p>
      </div>

    </div>
  </div>
</template>

<script>
import  { eventBus } from '@/main.js';

export default {
  name: "home",
  props: ["activeProfile"],
  computed: {
    avatarSRC(){
      return require("@/assets/" + this.activeProfile.avatar + ".png")
    }
  },
  methods: {
    showSkyScreen(){
      eventBus.$emit('show-star-screen')
    }
  }
}
</script>

<style lang="css" scoped>

  .home-instructions {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

</style>
