<template lang="html">
  <div class="app-container">
    <h1>Galaxy Quest</h1>
    <div class="game-container">
      <profile-container v-if="profileView === true" :profiles="profiles" />
    </div>
  </div>
</template>

<script>
import ProfileService from './services/ProfileService.js';
import ProfileContainer from './components/Profiles/ProfileContainer.vue';
import { eventBus } from './main.js';

export default {
  name: "app",
  components: {
    "profile-container": ProfileContainer
  },
  data(){
    return {
      createProfileView: false,
      profileView: true,
      profiles: [],
      activeProfile: null
    }
  },
  mounted(){
    this.fetchProfiles();

    eventBus.$on('profile-added', (newProfile) => {
      this.profiles.push(newProfile)
      this.profileView = false;
    })

    eventBus.$on('profile-selected', (selectedProfile) => {
      this.activeProfile = selectedProfile;
      this.profileView = false;
    })
  },
  methods: {
    fetchProfiles(){
      ProfileService.getProfiles()
      .then(profiles => this.profiles = profiles)
    }
  }
}
</script>

<style lang="css" scoped>

  .app-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .game-container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

</style>
