<template lang="html">
  <div class="app-container">
    <h1>Galaxy Quest</h1>
    <button v-if="!profileView" name="change-profile" class="change-profile-button" v-on:click="changeProfile" >Change Profile</button>
    <profile-container v-if="profileView" :profiles="profiles" />
      <div class="containers">
        <gameplay-container
          v-if="!profileView"
          :homeScreenViewGame="homeScreenViewGame"
          :gameWinStatus="gameWinStatus"
          :activeProfile="activeProfile"
          :planets="planets"
          :skyScreenStatus="skyScreenStatus"
          :activeGame="activeGame" />
        <instruction-container
          v-if="!profileView"
          :homeScreenViewInstructions="homeScreenViewInstructions"
          :activeProfile="activeProfile"
          :skyScreenStatus="skyScreenStatus"
          :selectedPlanet="selectedPlanet"
          :planetView="planetView"
          :activeGame="activeGame" />
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
      planets: [],
      gameWinStatus: false,
      skyScreenStatus: false,
      selectedPlanet: null,
      planetView: false,
      activeGame: null
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

    eventBus.$on('home-view', () => {
      this.homeScreenViewGame = true;
      this.homeScreenViewInstructions = true;
      this.skyScreenStatus = false;
      this.gameWinStatus = false;
      this.planetView = false;
      this.activeGame = null;
    })

    eventBus.$on('planet-selected', (planet) => {
      this.homeScreenViewInstructions = false;
      this.planets.forEach((planet) => {
        planet.isSelected = false;
      })
      planet.isSelected = true;
      this.selectedPlanet = planet;
      this.planetView = true;
    })

    eventBus.$on('show-star-screen', () => {
      this.homeScreenViewGame = false;
      this.homeScreenViewInstructions = false;
      this.skyScreenStatus = true;
      this.planetView = false;
    })

    eventBus.$on('profile-updated', (profile) => {
      this.fetchProfiles();
      this.activeProfile = profile;
    })

    eventBus.$on('game-won', () => {
      this.gameWinStatus = true;
      this.activeProfile.starPoints += 1;
    })

    eventBus.$on('game-selected', (game) => {
      this.activeGame = game;
      this.planetView = false;
      this.homeScreenViewGame = false;
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
    },
    changeProfile(){
      this.gameWinStatus = false;
      this.skyScreenStatus = false;
      this.homeScreenViewGame = false;
      this.homeScreenViewInstructions = false;
      this.profileView = true;
      this.activeProfile = null;
      this.planetView = false;
      this.activeGame = null;
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

  .change-profile-button {
    top: 2vh;
    right: 2vw;
    position: fixed;
  }



</style>
