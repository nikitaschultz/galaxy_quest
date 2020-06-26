<template lang="html">
  <div class="">
    <profile-container v-if="profileView = true" />
  </div>
</template>

<script>
import ProfileContainer from './components/Profiles/ProfileContainer.vue';

export default {
  name: "app",
  components: {
    "profile-container": ProfileContainer
  },
  data(){
    return {
      profileView: true
    }
  }
}
</script>

<style lang="css" scoped>
</style>
