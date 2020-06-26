<template lang="html">
  <div v-on:click="handleSelectProfile" class="profile">
    <h3>{{ profile.name }}</h3>
    <img v-bind:src="avatarSRC" alt="avatar-picture" height="100px">
    <h4>Star Points: {{ profile.starPoints }}</h4>
  </div>
</template>

<script>
import { eventBus } from '../../main.js';

export default {
  name: "profile",
  props: ["profile"],
  computed: {
    avatarSRC(){
      return require("../../assets/" + this.profile.avatar + ".png")
    }
  },
  methods: {
    handleSelectProfile(){
      eventBus.$emit('profile-selected', this.profile)
    }
  }
}
</script>

<style lang="css" scoped>

  .profile {
    background-color: pink;
    width: 200px;
    height: 200px;
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .profile:hover {
    background-color: green;
  }

</style>
