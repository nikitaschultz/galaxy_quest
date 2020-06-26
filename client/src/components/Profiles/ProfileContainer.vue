<template lang="html">
  <div class="profile-container">
    <h2>Who's exploring today?</h2>
    <profile-grid v-if="createProfileView === false" :profiles="profiles" />
    <create-profile v-if="createProfileView"/>
    <button v-if="createProfileView === false" v-on:click="toggleCreateView" type="button" name="button">Add a new explorer</button>
  </div>
</template>

<script>
import ProfileGrid from './ProfileGrid.vue';
import CreateProfile from './CreateProfile';
import { eventBus } from '../../main.js';

export default {
  name: "profile-container",
  components: {
    "profile-grid": ProfileGrid,
    "create-profile": CreateProfile
  },
  props: ["profiles"],
  data(){
    return {
      createProfileView: false
    }
  },
  mounted(){
    eventBus.$on('profile-added', (profile) => {
      this.createProfileView = false;
    })
  },
  methods: {
    toggleCreateView(){
      this.createProfileView = !this.createProfileView
    }
  }
}
</script>

<style lang="css" scoped>

  .profile-container {
    background-color: blue;
    width: 85vw;
    height: 75vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

</style>
