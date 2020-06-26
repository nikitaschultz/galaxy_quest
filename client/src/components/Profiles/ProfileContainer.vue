<template lang="html">
  <div class="profile-container">
    <h2>Who's exploring today?</h2>
    <profile-grid :profiles="profiles" />
  </div>
</template>

<script>
import ProfileGrid from './ProfileGrid.vue';

export default {
  name: "profile-container",
  components: {
    "profile-grid": ProfileGrid
  },
  props: ["profiles"]
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
