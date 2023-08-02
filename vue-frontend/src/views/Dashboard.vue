<script setup>
import Nav from "../components/Nav.vue";
import DoughnutChart from "./Dashboard/dashboard.vue";
import BarChart from "./Dashboard/barras.vue";
import api from "../services/api.js";
</script>
<template>
  <Nav></Nav>
  <div class="cards">
    <div class="card">
      <svg-icon type="mdi" class="icon" :path="iconCalendar"></svg-icon> RESERVADOS
    </div>
    <div class="card livre">
      <svg-icon type="mdi" class="icon" :path="iconCalendar2"></svg-icon> LIVRES
    </div>
  </div>
  <section>
    <div class="graficoBola">
      <doughnut-chart :data="chartData" :options="chartOptions" />
      <h2>Fantasias Alugadas</h2>
    </div>
    <div class="graficoBola">
      <doughnut-chart :data="chartData2" :options="chartOptions" />
      <h2>Horários dos Eventos</h2>
    </div>
    <BarChart class="graficoBarras" />
  </section>
</template>
<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiCalendarMonth, mdiCalendarCheck } from "@mdi/js";

export default {
  components: {
    DoughnutChart,
    SvgIcon,
  },
  data() {
    return {
      iconCalendar: mdiCalendarMonth,
      iconCalendar2: mdiCalendarCheck,
      arrayPraFuncionar: [],
      labels: [],
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Data 1",
            data: [],
            backgroundColor: ["#FF5733", "#3366FF", "#33FF33", "#B6C474"],
          },
        ],
      },
      chartData2: {
        labels: ["Noite", "Tarde", "Noite"],
        datasets: [
          {
            label: "Data 1",
            data: [0, 0, 0],
            backgroundColor: ["#FF5733", "#3366FF", "#33FF33"],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  created() {
    this.getAlugueis();
    this.getNomeTemas();
  },
  methods: {
    contarTemasEVariacoes(arrayDeObjetos) {
      // Crie um objeto para armazenar os temas únicos e suas contagens
      const temasEContagens = {};

      // Percorra o array de objetos
      for (const objeto of arrayDeObjetos) {
        // Verifique se o objeto contém a propriedade 'theme'
        if (objeto.hasOwnProperty("theme")) {
          const theme = objeto.theme;

          // Se o tema ainda não estiver no objeto, crie uma entrada com o subobjeto contendo o theme e a contagem
          if (!temasEContagens.hasOwnProperty(theme)) {
            temasEContagens[theme] = {
              theme: theme,
              contagem: 1,
            };
          } else {
            // Caso contrário, incremente a contagem do tema existente
            temasEContagens[theme].contagem++;
          }
        }
      }

      // Retorne um array contendo os temas e suas contagens
      return Object.values(temasEContagens);
    },

    getAlugueis() {
      let temas;
      api
        .get("/rents/")
        .then((res) => {
          temas = this.contarTemasEVariacoes(res.data);
          
          temas.map((item)=>{
            console.log(item.contagem);
            this.arrayPraFuncionar.push(item.contagem);
          });
          this.chartData.datasets[0].data = this.arrayPraFuncionar;
          //Map do gráfico 02
          res.data.map((item) => {
            this.labels.push(item.theme);
            var turno = this.verificarPeriodoDoDia(item.start_hours);
            if (turno == "Manhã") {
              this.chartData2.datasets[0].data[0] =
                this.chartData2.datasets[0].data[0] + 1;
            } else if (turno == "Tarde") {
              this.chartData2.datasets[0].data[1] =
                this.chartData2.datasets[0].data[1] + 1;
            } else {
              this.chartData2.datasets[0].data[2] =
                this.chartData2.datasets[0].data[2] + 1;
            }
          });
          //Map gráfico 01
          console.log("AAAA", temas);
          res.data.map((item) => {});
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getNomeTemas() {
      api
        .get("/themes/")
        .then((res) => {
          res.data.map((item) => {
            let nome = this.labels.find((element) => element == item.id);
            this.chartData.labels.push(item.name);
            console.log("teste", item.name);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    verificarPeriodoDoDia(horario) {
      const partes = horario.split(":");
      const hora = parseInt(partes[0]);
      if (hora >= 0 && hora < 12) {
        return "Manhã";
      } else if (hora >= 12 && hora < 18) {
        return "Tarde";
      } else {
        return "Noite";
      }
    },
  },
};
</script>
<style scoped>
h2 {
  color: black;
}
section {
  padding-top: 2vh;
  padding-left: 5vw;
  display: flex;
}
.graficoBola {
  width: 30vw;
  text-align: center;
}
.graficoBarras {
  width: 30vw;
  height: 380px;
}
.cards {
  display: flex;
  height: 60px;
  width: 95vw;
  justify-content: flex-end;
}

.card {
  display: flex;
  background-color: #eac666;
  border-radius: 10px;
  width: 15vw;
  margin-left: 20px;
  align-items: center;
  font-weight: bold;
  color: white;
}
.livre {
  background-color: #b6c474;
}
.icon {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
