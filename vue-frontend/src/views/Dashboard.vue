<script setup>
import Nav from '../components/Nav.vue';
import DoughnutChart from './Dashboard/dashboard.vue';
import BarChart from './Dashboard/barras.vue';
import api from '../services/api.js';
</script>
<template>
    <Nav></Nav>
    <section>
        <div class="graficoBola">
            <doughnut-chart :data="chartData" :options="chartOptions" />
            <h2>Fantasias Alugadas</h2>
        </div>
        <div class="graficoBola">
            <doughnut-chart :data="chartData2" :options="chartOptions" />
            <h2>Horários dos Eventos</h2>
        </div>
        <BarChart/>
    </section>
</template>
<script>
export default {
    components: {
        DoughnutChart,
    },
    data() {
        return {
            labels: [],
            chartData: {
                labels: [],
                datasets: [
                    {
                        label: 'Data 1',
                        data: [10, 20, 15],
                        backgroundColor: ['#FF5733', '#3366FF', '#33FF33'],
                    },
                ],
            },
            chartData2: {
                labels: ["Noite", "Tarde", "Noite"],
                datasets: [
                    {
                        label: 'Data 1',
                        data: [0, 0, 0],
                        backgroundColor: ['#FF5733', '#3366FF', '#33FF33'],
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
        getAlugueis() {
            api
                .get("/rents/")
                .then((res) => {
                    console.log(res.data);
                    res.data.map((item) => {
                        this.labels.push(item.theme);
                        var turno = this.verificarPeriodoDoDia(item.start_hours);
                        console.log("aqui", turno);
                        if (turno == "Manhã") {
                            this.chartData2.datasets[0].data[0] = this.chartData2.datasets[0].data[0] + 1;
                        } else if (turno == "Tarde") {
                            console.log('AAAAA', this.chartData2.datasets[0].data[0]);
                            this.chartData2.datasets[0].data[1] = this.chartData2.datasets[0].data[1] + 1;
                        } else {
                            this.chartData2.datasets[0].data[2] = this.chartData2.datasets[0].data[2] + 1;
                        }
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getNomeTemas() {
            api
                .get("/themes/")
                .then((res) => {
                    console.log("temaas", res.data);
                    res.data.map((item) => {

                        let nome = this.labels.find(element => element == item.id);
                        this.chartData.labels.push(item.name);
                    });
                })
                .catch((error) => {
                    console.log(error);
                });

        },
        verificarPeriodoDoDia(horario) {
            console.log(horario);
            const partes = horario.split(':');
            const hora = parseInt(partes[0]);

            if (hora >= 0 && hora < 12) {
                console.log("Manhã");
                return 'Manhã';
            } else if (hora >= 12 && hora < 18) {
                console.log("Tarde");
                return 'Tarde';
            } else {
                console.log("Noite");
                return 'Noite';
            }
        },

    }
};
</script>
<style scoped>
h2 {
    
    color: black;

}
</style>