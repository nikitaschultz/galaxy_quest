<template lang="html">
  <div class="star-instructions">
    <h2>Add stars to your Sky!</h2>
    <p>You have {{activeProfile.starPoints}} stars left!</p>
    <p v-if="activeProfile.starPoints">Click to add a star!</p>
    <button type="button" name="button" v-on:click="handleHomeButtonClick">Home</button>
  </div>
</template>

<script>
import { eventBus } from '@/main.js';

export default {
  name: "sky-screen-instructions",
  props: ["activeProfile"],
  methods: {
    handleHomeButtonClick(){
      eventBus.$emit('home-view');
    }
  }
}
</script>

<style lang="css" scoped>

  .star-instructions {
    text-align: center;
  }

</style>
