<template lang="html">

  <div id = "app">
    <h1>Duck Duck Goose</h1>

    <h2>To earn a STAR you must score 3 points, if you get a wrong answer you lose a life -> lose 3 lives then it's dead duck! </h2>

    <h2> How many ducks can you count? </h2>

    <h3> Click the GAME button to start </h3>


    <numbers-game />
  </div>
</template>

<script>

import NumbersGame from './components/NumbersGame';

export default {
  name: 'app',
  components: {
    'numbers-game': NumbersGame
  },

  data() {
    return {
    };
  },
  mounted(){

  }
}

</script>

<style lang="css" scoped>
</style>
