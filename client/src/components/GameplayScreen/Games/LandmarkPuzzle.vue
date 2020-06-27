<template lang="html">
  <div class="game-container">
    <canvas id="canvas" width="800" height="500"></canvas>
  </div>
</template>

<script>
export default {
  name: "landmark-puzzle",
  mounted(){
    
  }
}
</script>

<style lang="css" scoped>

  .game-container {
    background-color: white;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

</style>
