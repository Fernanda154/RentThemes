<script setup>
import Nav from '../../components/Nav.vue';
import api from '../../services/api.js';
</script>
<template>
    <div class="container">
        <Nav></Nav>
        <section class="container-title">
            <h1>ITENS</h1>
            <svg-icon type="mdi" style="color: #CF3A69" :size="32" class="icone" :path="iconGroup"></svg-icon>
        </section>
        <v-btn class="bnt" v-bind="props" @click="this.$router.push('/form-itens');">
            Novo
        </v-btn>
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
                            <svg-icon type="mdi" style="color: #174e66" :size="22" class="iconTable" :path="iconEdit" @click="this.goToEdit(item.id);" ></svg-icon>


                            <v-dialog v-model="dialog" persistent width="auto">
                                <template v-slot:activator="{ props }">
                                    <svg-icon type="mdi" style="color: #174e66" :size="22" class="iconTable" v-bind="props"
                                        :path="iconDelete"></svg-icon>
                                </template>
                                <v-card>
                                    <v-card-title class="text-h5">
                                        Excluir este item?
                                    </v-card-title>
                                    <v-card-text>
                                        Você deseja realmente apagar este item ? Esta ação é irreversível.
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="red" variant="text" @click="this.$router.push('/form-itens');">
                                            Cancelar
                                        </v-btn>
                                        <v-btn color="green-darken-1" variant="text" @click="deleteItem(item.id)">
                                            Confirmar
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
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
            dialog: false,

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
        deleteItem(id) {
            api
                .delete(`/itens/${id}/`)
                .then(() => {
                    console.log('Item excluido');
                    this.dialog = false;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        goToEdit(id){
            this.$router.push({ name: 'edit-itens', params: { id: id }});
        }
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
    margin-left: 4em;
}

.icone {
    align-self: center;
}

h1 {
    font-weight: bold !important;
}

.bnt {
    background-color: #0066FF;
    margin-right: 4em;
    color: white;
    float: right;
}

.iconTable {
    margin-left: 1em;
}

.actions {
    width: 15vw;
}
</style>
  