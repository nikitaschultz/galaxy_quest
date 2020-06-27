<template lang="html">
  <div class="home-instructions">
    <h2>Welcome explorer!</h2>
    <p>Click on any planet to continue on your quest!</p><br><br>
    <div class="profile">
      <h3>{{ activeProfile.name }}</h3>
      <img v-bind:src="avatarSRC" alt="avatar-picture" height="100px">
      <h4>Star Points: {{ activeProfile.starPoints }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  props: ["activeProfile"],
  computed: {
    avatarSRC(){
      return require("@/assets/" + this.activeProfile.avatar + ".png")
    }
  }
}
</script>

<style lang="css" scoped>

  .home-instructions {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

</style>
