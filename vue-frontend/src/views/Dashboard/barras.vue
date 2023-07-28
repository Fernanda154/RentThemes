<template>
    <div class="dashboard">
      <div class="chart-container">
        <canvas ref="barChart"></canvas>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
  
  export default defineComponent({
    mounted() {
      this.renderBarChart();
    },
    methods: {
      renderBarChart() {
        const ctx = this.$refs.barChart.getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['jan', 'fev ', 'mar', 'abr', 'maio', 'jun', 'jul', 'ago', 'set','out', 'nov', 'dez'],
            datasets: [
              {
                label: 'Data 1',
                data: [1, 2, 3,4,5,6,7,8,9,10,11,12],
                backgroundColor: '#3366FF',
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      },
    },
  });
  </script>
  
  <style>
  .dashboard {
    display: flex;
    justify-content: center;
  }
  
  .chart-container {
    width: 80%;
    max-width: 900px;
    margin: 20px;
  }
  </style>
  