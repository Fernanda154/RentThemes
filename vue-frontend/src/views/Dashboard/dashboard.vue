<template>
    <div>
      <canvas ref="doughnutChart"></canvas>
    </div>
  </template>
  
  <script>
 import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

  
  export default {
    props: {
      data: {
        type: Object,
        required: true,
      },
      options: {
        type: Object,
        required: true,
      },
      width: {
        type: Number,
        default: 400,
      },
      height: {
        type: Number,
        default: 400,
      },
    },
    mounted() {
      this.renderDoughnutChart();
    },
    methods: {
      renderDoughnutChart() {
        const ctx = this.$refs.doughnutChart.getContext('2d');
        this.doughnutChart = new Chart(ctx, {
          type: 'doughnut',
          data: this.data,
          options: this.options,
        });
      },
    },
    watch: {
      data: {
        handler() {
          this.doughnutChart.destroy();
          this.renderDoughnutChart();
        },
        deep: true,
      },
    },
    beforeDestroy() {
      if (this.doughnutChart) {
        this.doughnutChart.destroy();
      }
    },
  };
  </script>
  