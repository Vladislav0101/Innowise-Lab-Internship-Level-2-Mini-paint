<template>
  <div>
    <div class="count-events-date">
      <input type="date" v-model="minDate" />
      <input type="date" v-model="maxDate" />
      <button @click.prevent="setNewDate">Set date</button>
    </div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Chart } from "chart.js";
import { mapActions, mapGetters } from "vuex";

interface DataCountEvents {
  minDate: number;
  maxDate: number;
  chartIsReady: boolean;
  myChart: null | Chart;
}

export default Vue.extend({
  data(): DataCountEvents {
    return {
      minDate: 0,
      maxDate: 0,
      chartIsReady: false,
      myChart: null
    };
  },
  computed: {
    ...mapGetters(["objEventCount", "isLoadAnalytics", "dataAnalytics"])
  },

  methods: {
    ...mapActions(["addObjEventCount", "getAnalytics"]),

    drawChart(res: object) {
      const data = {
        labels: [],
        datasets: [
          {
            label: "Usage",
            backgroundColor: "#ca4260",
            borderColor: "#ca4260",
            data: []
          }
        ]
      };

      Object.entries(res).forEach((item: any) => {
        data.labels.push(item[0]);
        data.datasets[0].data.push(item[1]);
      });

      const config = {
        type: "bar",
        data,
        options: {}
      };

      if (this.chartIsReady && this.myChart) {
        this.myChart.update();
      } else {
        this.myChart = new Chart(this.$refs.canvas, config);
      }
    },

    setNewDate() {
      const minDate = this.minDate ? new Date(this.minDate).getTime() : 0;
      const maxDate = this.maxDate
        ? new Date(this.maxDate).getTime()
        : new Date().getTime();

      const newObj = Object.fromEntries(
        Object.entries(this.dataAnalytics).filter(item => {
          const key = +item[0];
          return minDate < key && key < maxDate;
        })
      );

      this.addObjEventCount(newObj).then(res => {
        const data: any = [];
        const labels: any = [];
        const chart = this.myChart;

        Object.entries(res).forEach((item: any) => {
          labels.push(item[0]);
          data.push(item[1]);
        });

        chart.data.labels = labels;
        chart.data.datasets[0].data = data;

        chart.update();
      });
    }
  },

  watch: {
    isLoadAnalytics() {
      this.addObjEventCount().then(res => this.drawChart(res));
    }
  }
});
</script>

<style scoped>
.count-events-date {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
}
</style>
