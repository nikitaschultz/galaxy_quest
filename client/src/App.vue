<template lang="html">
  <div class="app-container">
    <h1>Galaxy Quest</h1>
    <button v-if="!profileView" name="change-profile" class="change-profile-button" v-on:click="changeProfile" >Change Profile</button>
    <button v-if="profileView" name="admin-screen" class="change-profile-button" v-on:click="adminScreen" >Admin</button>
    <admin-view v-if="adminView" :profiles="profiles" :admin="admin" />
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
    <button class="attribution-button" v-on:click="toggleAttributionView">Attribution Credits</button>
    <attribution v-if="attributionView" />
  </div>
</template>

<script>
import PlanetService from './services/PlanetService.js';
import ProfileService from './services/ProfileService.js';
import AdminService from './services/AdminService.js';
import ProfileContainer from './components/Profiles/ProfileContainer.vue';
import GameplayContainer from './components/GameplayScreen/GameplayContainer.vue';
import AdminView from './components/Profiles/AdminView.vue';
import InstructionContainer from './components/InstructionScreen/InstructionContainer.vue';
import Attribution from './components/Attribution.vue';
import { eventBus } from './main.js';

export default {
  name: "app",
  components: {
    "profile-container": ProfileContainer,
    "gameplay-container": GameplayContainer,
    "instruction-container": InstructionContainer,
    "admin-view": AdminView,
    "attribution": Attribution
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
      activeGame: null,
      adminView: false,
      admin: null,
      attributionView: false
    }
  },
  mounted(){
    this.fetchProfiles();
    this.fetchPlanets();
    this.fetchAdmin();

    eventBus.$on('profile-added', (newProfile) => {
      this.profiles.push(newProfile);
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
      document.getElementById(this.selectedPlanet.name).classList.remove('selected-planet');
      this.selectedPlanet = null;
    })

    eventBus.$on('planet-selected', (planet) => {
      this.homeScreenViewInstructions = false;
      this.planets.forEach((planet) => {
        planet.isSelected = false;
      })
      planet.isSelected = true;
      if(this.selectedPlanet){
        document.getElementById(this.selectedPlanet.name).classList.remove('selected-planet');
      };
      document.getElementById(planet.name).classList.add('selected-planet');
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
      if(!this.activeProfile.completedGames.includes(this.activeGame.name)){
        this.activeProfile.completedGames.push(this.activeGame.name);
        this.activeProfile.starPoints += 3;
      }else{
        this.activeProfile.starPoints += 1;
      }

      const updatedData = {
        starPoints: this.activeProfile.starPoints,
        completedGames: this.activeProfile.completedGames
      }

      ProfileService.updateProfile(this.activeProfile._id, updatedData)
      .then((profile) => {
        this.fetchProfiles()
        this.activeProfile = profile
      })
      })

    eventBus.$on('game-selected', (game) => {
      this.activeGame = game;
      this.planetView = false;
      this.homeScreenViewGame = false;
      this.homeScreenViewInstructions = false;
    })

    eventBus.$on('toggle-admin-view', () => {
      this.adminView = !this.adminView;
    })

    eventBus.$on('profile-deleted', () => {
      this.fetchProfiles();
    })

    eventBus.$on('password-updated', () => {
      this.fetchAdmin();
    })

    eventBus.$on('toggle-attribution-view', () => {
      this.toggleAttributionView();
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
    fetchAdmin(){
      AdminService.getAdmin()
      .then(admin => this.admin = admin[0])
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
    },
    adminScreen(){
      eventBus.$emit('admin-view');
      this.adminView = !this.adminView;
    },
    toggleAttributionView(){
      this.attributionView = !this.attributionView;
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

  .attribution-button {
    background-color: transparent;
    color: grey;
    border: none;
    font-size: 15px;
    height: 20px;
    position: fixed;
    bottom: 5px;
    right: 5px;
    font-weight: lighter;
  }



</style>
