<template lang="html">
  <div class="row">
    <div class="column">
      <img src="@/assets/animals/donkey.jpg" alt="donkey">
      <img src="@/assets/animals/horse.jpg" alt="horse">
    </div>
    <div class="column">
      <img src="@/assets/animals/pig.jpg" alt="pig">
      <img src="@/assets/animals/sheep.jpg" alt="sheep">
    </div>
    <div class="column">
      <p>Where is the {{this.answer}}?</p>
    </div>
  </div>
</template>

<script>
import {eventBus} from './main.js';


export default {
  data(){
    return {
      // the players answer
      answer: null,

      // the expected answer
      solution: "donkey",
      dataPoint2: "dataPoint2"
    }
  }
}
</script>

<style lang="css" scoped>

.row {
  display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
}

/* Create two equal columns that sits next to each other */
.column {
  flex: 50%;
  padding: 0 4px;
}

.column img {
  margin-top: 8px;
  vertical-align: middle;
}

</style>

<!-- placeholder data before the game is wired into the db -->
databaseData =
