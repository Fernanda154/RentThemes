<script setup>
import Nav from '../../components/Nav.vue';
import api from '../../services/api.js';
</script>
<template>
    <div class="container">
        <Nav></Nav>
        <section class="container-title">
            <h1>TEMAS</h1>
            <svg-icon type="mdi" style="color: #CF3A69" :size="32" class="icone" :path="iconGroup"></svg-icon>
        </section>
        <div class="container-form">
            <label for="nome">Nome</label>
            <input type="text" class="input-text" v-model="tema.name" placeholder="Lustre colorido, Bola, Banquinho ..."
                name="nome" id="nome" required>
            <label for="nome">Cor</label>
            <input type="text" class="input-text" v-model="tema.color" placeholder="Verde, Vermelho, Rosa..." name="cor"
                id="cor" required>
            <label for="descricao">Preço</label>
            <input type="text" class="input-text" v-model="tema.price" placeholder="200,00" name="preco" id="preco"
                required>
            <div v-for="(item) in itens">
                <input type="checkbox" class="check" :id="item.id" :value="item.id" v-model="selectedItems">
                <label for="subscribeNews"> {{ item.name }} </label>
            </div>

            <div class="actions">
                <v-btn class="secundary" v-bind="props" @click="this.$router.push('/temas');">
                    Cancelar
                </v-btn>

                <v-btn class="bnt" v-if="!editable" v-bind="props" @click="postTema()">
                    Salvar
                </v-btn>

                <v-btn class="bnt" v-else v-bind="props" @click="updateTema()">
                    Atualizar
                </v-btn>
            </div>
        </div>
    </div>
</template>
<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccountGroup } from '@mdi/js';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {

    components: {
        SvgIcon
    },
    data() {
        return {
            iconGroup: mdiAccountGroup,
            tema: {
                name: '',
                color: '',
                price: 0,
                itens: []
            },
            itens: [],
            editable: false,
            selectedItems: []
        }
    },
    created() {
        this.getItens();
        if (this.$route.params.id != null || undefined) {
            console.log('to no if');
            this.getTema(this.$route.params.id);
            this.editable = true;
        }
    },
    methods: {
        exibirToast() {
            toast("Item cadastrado com sucesso!", {
                autoClose: 1000,
                type: 'success'
            }); // ToastOptions
        },
        postTema() {
            this.tema.itens = this.selectedItems;
            api
                .post("/themes/", this.tema)
                .then(() => {
                    this.exibirToast();
                    console.log('Tema cadastrado com sucesso.')
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getTema(id) {
            api
                .get("/themes/" + id + "/")
                .then((resp) => {
                    console.log(resp.data);
                    this.tema = resp.data;
                    this.selectedItems = this.tema.itens;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        updateTema() {
            this.tema.itens = this.selectedItems;
            api
                .put(`/themes/${this.$route.params.id}/`, this.tema)
                .then(() => {
                    toast("Tema atualizado com sucesso!", {
                        autoClose: 1000,
                        type: 'success'
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        },

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

.actions {
    display: flex;
    align-self: flex-end;
}

.check {
    display: flex;
    align-self: flex-start;
    color: black;
}

.container-form {
    width: 46vw;
    margin: 0% auto;
    margin-top: 2em;
    display: flex;
    flex-direction: column;
}

.input-text {
    border: 1px rgb(156, 152, 152) solid;
    border-radius: 5px;
    padding: 0.3em;
    margin-bottom: 1em;
}

label {
    color: #CF3A69;
    font-weight: bold;
}

.bnt {
    align-self: flex-end;
    background-color: #7E9417;
    color: white;
    font-weight: bold !important;
}

.v-btn__content,
.v-btn__prepend,
.v-btn__append {
    font-weight: 600;
}

.secundary {
    background-color: rgb(199, 199, 199);
    color: white;
    margin-right: 1em;
}
</style>
  