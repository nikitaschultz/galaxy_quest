<template lang="html">
  <div class="star-instructions">
    <h2>Add stars to your Sky!</h2>
    <p>You have {{activeProfile.starPoints}} stars left!</p>
    <p v-if="activeProfile.starPoints">Click to add a star!</p>
  </div>
</template>

<script>
import { eventBus } from '@/main.js';

export default {
  name: "sky-screen-instructions",
  props: ["activeProfile"]
}
</script>

<style lang="css" scoped>

  .star-instructions {
    text-align: center;
  }

</style>
