<script setup>
import Nav from '../components/Nav.vue'
</script>
<template>
    <div class="container">
        <Nav></Nav>
        <v-container>
            <v-row no-gutters>
                <v-col >
                    <section class="container-title">
                        <h1>ITENS</h1>
                        <svg-icon type="mdi" style="color: #CF3A69" :size="32" class="icone" :path="path"></svg-icon>
                    </section>
                </v-col>
                <v-col cols="1">
                    <v-btn class="bnt">
                        Novo
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
        <section class="container-page">
            <v-table>
                <thead>
                    <tr>
                        <th class="text-left">
                            Name
                        </th>
                        <th class="text-left">
                            Calories
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in desserts" :key="item.name">
                        <td>{{ item.name }}</td>
                        <td>{{ item.calories }}</td>
                    </tr>
                </tbody>
            </v-table>
        </section>
    </div>
</template>
<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccountGroup } from '@mdi/js';

export default {
    components: {
        SvgIcon
    },
    data() {
        return {
            path: mdiAccountGroup,
            desserts: [
                {
                    name: 'Frozen Yogurt',
                    calories: 159,
                },
                {
                    name: 'Ice cream sandwich',
                    calories: 237,
                },
                {
                    name: 'Eclair',
                    calories: 262,
                },
                {
                    name: 'Cupcake',
                    calories: 305,
                },
                {
                    name: 'Gingerbread',
                    calories: 356,
                },
                {
                    name: 'Jelly bean',
                    calories: 375,
                },
                {
                    name: 'Lollipop',
                    calories: 392,
                },
                {
                    name: 'Honeycomb',
                    calories: 408,
                },
                {
                    name: 'Donut',
                    calories: 452,
                },
                {
                    name: 'KitKat',
                    calories: 518,
                },
            ],
        }
    },
}
</script>
<style scoped>
.container-page {
    margin: 4em;
    padding: 1em;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
    border-radius: 10px;
}

.container-title {
    display: flex;
    color: #CF3A69;
    font-weight: bold !important;
}
.icone {
    align-self: center;
}

h1 {
    font-weight: bold !important;
}

.bnt {
    background-color: #0066FF;
    color: white;
}
</style>
  