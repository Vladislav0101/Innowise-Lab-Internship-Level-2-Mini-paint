<template>
  <div>
    <CountEvents :chartData="chartData" :chartOptions="chartOptions" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import CountEvents from "@/components/Analytics/CountEvents.vue";

export default Vue.extend({
  components: { CountEvents },
  data() {
    return {
      chartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        datasets: [
          {
            label: "Data One",
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  }
});
</script>
