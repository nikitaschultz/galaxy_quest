<template lang="html">
  <div>
    <h2>New Explorer</h2>
    <form class="new-profile">
      <div class="horizontal-flex">
        <label for="name">Name:</label>
        <input type="text" name="" value="">
      </div>
      <div class="horizontal-flex">
        <img v-for="avatar in avatars" v-on:click="selectAvatar(avatar.name)" :src="avatar.url" :value="avatar.name" height="100px">
      </div>
    </form>
    <div class="horizontal-flex">
      <button name="create-profile">Start Exploring</button>
      <button name="back-button">Back</button>
    </div>
  </div>
</template>

<script>
import ProfileService from '../services/ProfileService.js';

export default {
  name: "create-profile",
  data(){
    return {
      avatars: [
        {
          name: "avatar1",
          url: this.getURL("avatar1")
        },
        {
          name: "avatar2",
          url: this.getURL("avatar2")
        },
        {
          name: "avatar3",
          url: this.getURL("avatar3")
        },
        {
          name: "avatar4",
          url: this.getURL("avatar4")
        },
        {
          name: "avatar5",
          url: this.getURL("avatar5")
        }
      ],
      selectedAvatar: null
    }
  },
  methods: {
    getURL(avatar){
      return require("@/assets/" + avatar + ".png")
    },
    selectAvatar(avatar){
      this.selectedAvatar = avatar
    },
    createProfile(){

    }
  }
}
</script>

<style lang="css" scoped>

  .new-profile {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .buttons-horizontal {
    display: flex;
    flex-direction: row;
  }

</style>
