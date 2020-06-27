<template lang="html">
  <div class="profile-grid">
    <profile v-for="(profile, index) in profiles" :profile="profile" :key="index" />
  </div>
</template>

<script>
import Profile from './Profile.vue';

export default {
  name: "profile-grid",
  components: {
    "profile": Profile
  },
  props: ["profiles"]
}
</script>

<style lang="css" scoped>

  .profile-grid {
    display: flex;
    flex-wrap: wrap;
  }

</style>
