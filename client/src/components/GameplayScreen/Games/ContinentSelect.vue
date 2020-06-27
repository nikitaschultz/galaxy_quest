<template lang="html">
  <div class="game-container">
    <button v-if="loading" v-on:click="loadInstructions" type="button" name="button">Let's Go!</button>
    <GChart v-if="!loading" type="GeoChart" :data="chartData" :options="chartOptions" :events="chartEvents" ref="gChart" /><br>
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts';
import { eventBus } from '../../../main.js'

export default {
  name: "continent-select",
  components: {
    GChart
  },
  data(){
    return {
      loading: true,
      winStatus: false,
      continentArray: ["Africa", "Europe", "The Americas", "Asia", "Oceania"],
      correctAnswer: null,
      chartOptions: {
          title: "Continents of the World",
          region: 'world',
          resolution: 'continents',
          colorAxis: {colors: ['orangered', 'limegreen', 'cornflowerblue', 'gold', 'violet']},
          legend: 'none',
          height: 400,
          backgroundColor: 'none',
          tooltip: {isHtml: true, trigger: 'selection'},
        },
      chartData: [
          ['Code', 'Continent', 'Answer', {role: 'tooltip'}],
          ['002', 'Africa', 0, "You selected Africa!"],
          ['150', 'Europe', 1, "You selected Europe!"],
          ['019', 'The Americas', 2, "You selected the Americas!"],
          ['142', 'Asia', 3, "You selected Asia!"],
          ['009', 'Oceania', 4, "You selected Oceania!"]
        ],
      chartEvents: {
        'select': () => {
          const chart = this.$refs.gChart.chartObject;
          if(chart.getSelection()[0]){
            const selectionIndex = chart.getSelection()[0].row;
            this.selectedAnswer = this.continentArray[selectionIndex];
            this.checkAnswer();
          }
        }
      },
      selectedAnswer: null
    }
  },
  mounted(){
    this.getCorrectAnswer()
  },
  methods: {
    getCorrectAnswer(){
      const answer = this.continentArray[Math.floor(Math.random() * 5)]
      this.correctAnswer = answer
    },
    loadInstructions(){
      eventBus.$emit('continent-select-game-loaded', this.correctAnswer)
      this.loading = false;
    },
    checkAnswer(){
      if(this.selectedAnswer === this.correctAnswer){
        eventBus.$emit('continent-select-game-won')
      }else{
        eventBus.$emit('continent-select-game-lost')
      }
    }
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
