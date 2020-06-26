<template lang="html">
  <div class="app-container">
    <h1>Galaxy Quest</h1>
    <div class="game-container">
      <profile-container v-if="profileView = true" :profiles="profiles"/>
    </div>
  </div>
</template>

<script>
import ProfileService from './services/ProfileService.js';
import ProfileContainer from './components/Profiles/ProfileContainer.vue';

export default {
  name: "app",
  components: {
    "profile-container": ProfileContainer
  },
  data(){
    return {
      profileView: true,
      profiles: []
    }
  },
  mounted(){
    this.fetchProfiles();
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
