<template>
  <div class="dashboard">
    <div class="chart-container">
      <canvas ref="barChart"></canvas>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Chart } from "chart.js";
import api from "../../services/api.js";

export default defineComponent({
  data() {
    return {
      dataT: {
        labels: [
          "jan",
          "fev",
          "mar",
          "abr",
          "maio",
          "jun",
          "jul",
          "ago",
          "set",
          "out",
          "nov",
          "dez",
        ],
      },
      obj: {
        type: "bar",
        data: {
          labels: [],
          datasets: [
            {
            label: "Vendas",
            data: [],
            backgroundColor: "#3366FF",
            }
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
      },
    };
  },
  mounted() {
    this.getAlugueis();
  },
  methods: {
    renderBarChart() {
      const ctx = this.$refs.barChart.getContext("2d");
      
      console.log("qqq", this.obj.data.datasets[0].data);
      new Chart(ctx, this.obj);
    },
    contarRecorrenciasPorMes(alugueis) {
      const recorrenciasPorMes = {};
      for (const aluguel of alugueis) {
        const data = new Date(aluguel.date);
        const mes = data.getMonth() + 1;
        const ano = data.getFullYear();
        const chave = `${mes}`;

        if (!recorrenciasPorMes.hasOwnProperty(chave)) {
          recorrenciasPorMes[chave] = 1;
        } else {
          recorrenciasPorMes[chave]++;
        }
      }

      // Converter o objeto em um array de objetos com chaves e valores
      const arrayRecorrencias = Object.keys(recorrenciasPorMes).map((chave) => ({
        mes: chave,
        recorrencias: recorrenciasPorMes[chave],
      }));

      return arrayRecorrencias;
    },
    getAlugueis() {
      let recorrencia;
      let localData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      api
        .get("/rents/")
        .then((res) => {
          recorrencia = this.contarRecorrenciasPorMes(res.data);
          console.log("FFF", recorrencia);
          recorrencia.map((item) => {
            console.log("map", item);
            localData[item.mes -1] = item.recorrencias; // Correção do nome da propriedade
          });
          this.obj.data.labels = this.dataT.labels;
          this.obj.data.datasets[0].data = localData;
          console.log("obj", this.obj);
          this.renderBarChart(); // Atualizar o gráfico após obter os dados
        })
        .catch((error) => {
          console.log(error);
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
