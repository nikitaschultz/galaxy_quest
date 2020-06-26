<template lang="html">
  <div class="profile-container">
    <h2>Who's exploring today?</h2>
    <div v-if="createProfileView === false">
      <profile-grid  :profiles="profiles" />
      <button v-if="createProfileView === false" v-on:click="toggleCreateView" type="button" name="button">Add a new explorer</button>
    </div>
    <div  v-if="createProfileView">
      <create-profile />
    </div>
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

    eventBus.$on('toggleCreateView', () => {
      this.createProfileView = !this.createProfileView
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
