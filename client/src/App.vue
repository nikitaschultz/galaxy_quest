<template lang="html">
  <div class="app-container">
    <h1>Galaxy Quest</h1>
    <profile-container v-if="profileView" :profiles="profiles" />
      <div class="containers">
        <gameplay-container :homeScreenViewGame="homeScreenViewGame" :activeProfile="activeProfile" :planets="planets" v-if="!profileView" />
        <instruction-container :homeScreenViewInstructions="homeScreenViewInstructions" :activeProfile="activeProfile" v-if="!profileView" />
      </div>
  </div>
</template>

<script>
import PlanetService from './services/PlanetService.js';
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
      homeScreenViewGame: false,
      homeScreenViewInstructions: false,
      planets: []
    }
  },
  mounted(){
    this.fetchProfiles();
    this.fetchPlanets();

    eventBus.$on('profile-added', (newProfile) => {
      this.profiles.push(newProfile)
      this.activeProfile = newProfile;
      this.profileView = false;
      this.homeScreenViewGame = true;
      this.homeScreenViewInstructions = true;
    })

    eventBus.$on('profile-selected', (selectedProfile) => {
      this.activeProfile = selectedProfile;
      this.profileView = false;
      this.homeScreenViewGame = true;
      this.homeScreenViewInstructions = true;
    })

    eventBus.$on('planet-selected', (planet) => {
      this.homeScreenViewInstructions = false;
    })
  },
  methods: {
    fetchProfiles(){
      ProfileService.getProfiles()
      .then(profiles => this.profiles = profiles)
    },
    fetchPlanets(){
      PlanetService.getPlanets()
      .then(planets => this.planets = planets)
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
