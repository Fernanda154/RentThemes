<script setup>
import Nav from '../components/Nav.vue';
import api from '../services/api.js';
</script>
<template>
    <div class="container">
        <Nav></Nav>
        <v-container>
            <v-row no-gutters>
                <v-col>
                    <section class="container-title">
                        <h1>ITENS</h1>
                        <svg-icon type="mdi" style="color: #CF3A69" :size="32" class="icone" :path="iconGroup"></svg-icon>
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
                            Código
                        </th>
                        <th class="text-left">
                            Nome
                        </th>
                        <th class="text-left">
                            Descrição
                        </th>
                        <th class="text-left actions-header">
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in itens" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.description }}</td>
                        <td class="actions">
                            <svg-icon type="mdi" style="color: #58b7e0" :size="32" class="iconTable"
                                :path="iconDetail"></svg-icon>
                            <svg-icon type="mdi" style="color: #e0e058" :size="32" class="iconTable"
                                :path="iconEdit"></svg-icon>
                            <svg-icon type="mdi" style="color: #e05858" :size="32" class="iconTable"
                                :path="iconDelete"></svg-icon>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </section>
    </div>
</template>
<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccountGroup, mdiPencilOutline, mdiTrashCanOutline, mdiEyeOutline } from '@mdi/js';

export default {
    components: {
        SvgIcon
    },
    data() {
        return {
            iconGroup: mdiAccountGroup,
            iconEdit: mdiPencilOutline,
            iconDelete: mdiTrashCanOutline,
            iconDetail: mdiEyeOutline,
            itens: [],
        }
    },
    created() {
        this.getItens();
    },
    methods: {
        getItens() {
            api
                .get("/itens/")
                .then((res) => {
                    this.itens = res.data;
                    console.log(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    }
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

.iconTable {
    margin-left: 1em;
}

.actions {
    width: 15vw;
}

.actions-header {
    padding-left: 2em !important;
}
</style>
  