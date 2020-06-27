<template lang="html">
  <div>
    <h2>Continents of the World</h2>
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
      correctAnswer: "Asia",
      chartOptions: {
          title: "Continents of the World",
          region: 'world',
          resolution: 'continents',
          colorAxis: {colors: ['red', 'green', 'blue', 'yellow', 'orange']},
          legend: 'none',
          height: 300,
          backgroundColor: 'none',
          tooltip: {isHtml: true, trigger: 'none'},
        },
      chartData: [
          ['Code', 'Continent', 'Answer', {role: 'tooltip'}],
          ['002', '????', 1, "Selected!"],
          ['150', '????', 2, "Selected!"],
          ['019', '????', 3, "Selected!"],
          ['142', '????', 4, "Selected!"],
          ['009', '????', 5, "Selected!"]
        ],
      chartEvents: {
        'select': () => {
          const chart = this.$refs.gChart.chartObject;
          const selection = chart.getSelection();
          console.log(selection);
        }
      }
    }
  },
  computed: {
    selectedContinent(){
      return GChart.getSelection()
    }
  }
}
</script>

<style lang="css" scoped>

  h2 {
    text-align: center;
    color: white;
  }

</style>
