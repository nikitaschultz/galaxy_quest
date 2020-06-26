<template lang="html">
  <div class="profile">
    <h3>{{ profile.name }}</h3>
    <img v-bind:src="avatarSRC" alt="avatar-picture" height="100px">
    <h4>Star Points: {{ profile.starPoints }}</h4>
  </div>
</template>

<script>

export default {
  name: "profile",
  props: ["profile"],
  computed: {
    avatarSRC(){
      return require("../../assets/" + this.profile.avatar + ".png")
    }
  }
}
</script>

<style lang="css" scoped>

  .profile {
    background-color: pink;
    width: 200px;
    height: 200px;
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

</style>
