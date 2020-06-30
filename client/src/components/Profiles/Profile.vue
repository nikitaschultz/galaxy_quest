<template lang="html">
  <div class="profile-content">
    <div v-on:click="handleSelectProfile" class="profile">
      <h3>{{ profile.name }}</h3>
      <img v-bind:src="avatarSRC" alt="avatar-picture" height="80px">
      <h4>Star Points: {{ profile.starPoints }}</h4>
    </div>
    <button type="button" name="edit-profile" class="edit-button" v-on:click="toggleEditView" >Edit Profile</button>
  </div>
</template>

<script>
import { eventBus } from '../../main.js';

export default {
  name: "profile",
  props: ["profile"],
  computed: {
    avatarSRC(){
      return require("@/assets/" + this.profile.avatar + ".png")
    }
  },
  methods: {
    handleSelectProfile(){
      eventBus.$emit('profile-selected', this.profile)
    },
    toggleEditView(){
      eventBus.$emit('toggle-edit-view', this.profile)
    }
  }
}
</script>

<style lang="css" scoped>

  .profile {
    border: solid 2px midnightblue;
    width: 200px;
    height: 180px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
  }

  .profile:hover {
    background-color: white;
    box-shadow: 0 0 20px gold;
  }

  .profile-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h3 {
    margin: 0;
  }

</style>
