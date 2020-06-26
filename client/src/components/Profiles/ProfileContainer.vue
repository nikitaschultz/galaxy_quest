<template lang="html">
  <div class="profile-container">
    <h2>Who's exploring today?</h2>
    <profile-grid v-if="createProfileView === false" :profiles="profiles" />
    <create-profile v-if="createProfileView"/>
    <button type="button" name="button">Add a new explorer</button>
  </div>
</template>

<script>
import ProfileGrid from './ProfileGrid.vue';
import CreateProfile from './CreateProfile';

export default {
  name: "profile-container",
  components: {
    "profile-grid": ProfileGrid,
    "create-profile": CreateProfile
  },
  props: ["profiles"],
  data(){
    return {
      createProfileView: true
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
