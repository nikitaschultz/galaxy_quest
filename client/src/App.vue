<template lang="html">
  <div class="app-container">
    <h1>Galaxy Quest</h1>
    <profile-container v-if="profileView" :profiles="profiles" />
      <div class="containers">
        <gameplay-container :homeScreenView="homeScreenView" :activeProfile="activeProfile" :activeGame="activeGame" v-if="!profileView" />
        <instruction-container :homeScreenView="homeScreenView" :activeProfile="activeProfile" :activeGame="activeGame" v-if="!profileView" />
      </div>
  </div>
</template>

<script>
import ProfileService from './services/ProfileService.js';
import ProfileContainer from './components/Profiles/ProfileContainer.vue';
import GameplayContainer from './components/GameplayScreen/GameplayContainer.vue';
import InstructionContainer from './components/InstructionScreen/InstructionContainer.vue';
import { eventBus } from './main.js';

export default {
  name: "app",
  components: {
    "profile-container": ProfileContainer,
    "gameplay-container": GameplayContainer,
    "instruction-container": InstructionContainer
  },
  data(){
    return {
      createProfileView: false,
      profileView: true,
      profiles: [],
      activeProfile: null,
      activeGame: null,
      homeScreenView: false
    }
  },
  mounted(){
    this.fetchProfiles();

    eventBus.$on('profile-added', (newProfile) => {
      this.profiles.push(newProfile)
      this.profileView = false;
      this.homeScreenView = true;
    })

    eventBus.$on('profile-selected', (selectedProfile) => {
      this.activeProfile = selectedProfile;
      this.profileView = false;
      this.homeScreenView = true;
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

  .containers {
    display: flex;
    flex-direction: row;
    align-items: center;
  }



</style>
