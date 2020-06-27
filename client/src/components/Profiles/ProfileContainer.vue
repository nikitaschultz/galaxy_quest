<template lang="html">
  <div class="profile-container">
    <div class="centered" v-if="createProfileView === false">
      <h2>Who's exploring today?</h2><br>
      <profile-grid  :profiles="profiles" /><br><br>
      <button v-if="createProfileView === false" v-on:click="toggleCreateView" type="button" name="button">Add a new explorer</button>
    </div>
    <div class="centered" v-if="createProfileView">
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
    background-color: white;
    width: 85vw;
    height: 75vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 0 30px cornflowerblue;
  }

  .centered {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

</style>
