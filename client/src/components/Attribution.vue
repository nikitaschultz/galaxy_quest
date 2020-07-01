<template lang="html">
  <div class="attribution-container">
    <h3>Attribution Credits:</h3>
    <a href="https://www.freepik.com/free-photos-vectors/party">Party vector created by pch.vector - www.freepik.com</a><br><br>
    <a href="https://icons8.com/icon/81014/planet">Planet icon by Icons8</a><br><br>
    <button name="button" v-on:click="toggleAttributionView">Close</button>
  </div>
</template>

<script>
import { eventBus } from '@/main.js';

export default {
  name: "attribution",
  methods: {
    toggleAttributionView(){
      eventBus.$emit('toggle-attribution-view')
    }
  }
}
</script>

<style lang="css" scoped>

  .attribution-container {
    position: fixed;
    width: 50vw;
    height: 30vh;
    top: 30vh;
    left: 25vw;
    background-color: white;
    box-shadow: 0 0 30px cornflowerblue;
    border: 1px solid midnightblue;
    text-align: center;
  }

  a {
  font-size: 25px;
  font-family: 'Boogaloo', cursive;
  color: black;
  text-decoration: none;
  }


</style>
