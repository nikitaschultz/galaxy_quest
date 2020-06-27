<template lang="html">
  <div class="game-container">
    <GChart type="GeoChart" :data="chartData" :options="chartOptions" :events="chartEvents" ref="gChart" />
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts';

export default {
  name: "continent-select",
  components: {
    GChart
  },
  data(){
    return {
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
          ['002', 'Red Continent', 0, "Selected!"],
          ['150', 'Green Continent', 1, "Selected!"],
          ['019', 'Blue Continent', 2, "Selected!"],
          ['142', 'Yellow Continent', 3, "Selected!"],
          ['009', 'Pink Continent', 4, "Selected!"]
        ],
      chartEvents: {
        'select': () => {
          const chart = this.$refs.gChart.chartObject;
          const selectionIndex = chart.getSelection()[0].row;
          const countryArray = ["Africa", "Europe", "Americas", "Asia", "Oceania"]
          this.selectedAnswer = countryArray[selectionIndex];
        }
      },
      selectedAnswer: null
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
