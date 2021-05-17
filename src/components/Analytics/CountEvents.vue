<template>
  <canvas id="canvas"></canvas>
</template>
<script lang="ts">
import Vue from "vue";
import { Chart } from "chart.js";
// import { Bar } from "vue-chartjs";

export default Vue.extend({
  // extends: Bar,

  // props: ["chartData", "chartOptions"],

  mounted() {
    const labels = ["January", "February", "March", "April", "May", "June"];
    const data = {
      labels: labels,
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: [0, 10, 5, 2, 20, 30, 45]
        }
      ]
    };
    const config = {
      type: "bar",
      data,
      options: {}
    };
    const myChart = new Chart(document.getElementById("canvas"), config);
  }
});
</script>
