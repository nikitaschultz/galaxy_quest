<template lang="html">
  <div class="centered">
    <h2>New Explorer</h2><br>
    <form class="new-profile">
      <div class="horizontal-flex">
        <label for="name">Name:</label>
        <input class="text-box" type="text" v-model:value="profileName">
      </div>
      <div class="horizontal-flex">
        <img v-for="avatar in avatars" v-on:click="selectAvatar(avatar)" :src="avatar.url" :value="avatar.name" height="100px" v-bind:class="{selected: avatar.selected}">
      </div>
    </form>
    <div class="horizontal-flex">
      <button v-on:click="handleCreateProfile" name="create-profile">Start Exploring</button>
      <button v-on:click="handleBackButton" name="back-button">Back</button>
    </div>
  </div>
</template>

<script>
import ProfileService from '../../services/ProfileService.js';
import { eventBus } from '../../main.js';


export default {
  name: "create-profile",
  data(){
    return {
      avatars: [
        {
          name: "avatar1",
          url: this.getURL("avatar1"),
          selected: false
        },
        {
          name: "avatar2",
          url: this.getURL("avatar2"),
          selected: false
        },
        {
          name: "avatar3",
          url: this.getURL("avatar3"),
          selected: false
        },
        {
          name: "avatar4",
          url: this.getURL("avatar4"),
          selected: false
        },
        {
          name: "avatar5",
          url: this.getURL("avatar5"),
          selected: false
        }
      ],
      selectedAvatar: null,
      profileName: ""
    }
  },
  methods: {
    getURL(avatar){
      return require("@/assets/" + avatar + ".png")
    },
    selectAvatar(avatar){
      if(this.selectedAvatar){this.selectedAvatar.selected = false}
      this.selectedAvatar = avatar;
      avatar.selected = !avatar.selected;
    },
    handleCreateProfile(){
      const profile = {
        name: this.profileName,
        avatar: this.selectedAvatar.name,
        starPoints: 0,
        completedGames: [],
        starCoordinates: []
      }

      ProfileService.postProfile(profile)
      .then(res => eventBus.$emit('profile-added', res))
    },
    handleBackButton(){
      eventBus.$emit('toggle-create-view')
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

  .horizontal-flex {
    display: flex;
    flex-direction: row;
    margin: 0 0 40px 0;
  }

  .centered {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .selected {
    filter: drop-shadow(0 0 10px gold);
  }

  img {
    margin: 0 20px 0 20px;
  }

  img:hover {
    filter: drop-shadow(0 0 10px gold);
  }

  label {
    font-family: 'Boogaloo', cursive;
    font-size: 30px;
    color: #003399;
    margin: 0 20px 0 0;
  }


</style>
