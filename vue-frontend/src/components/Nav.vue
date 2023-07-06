<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
    <nav>
        <img src="../assets/logo01.svg" alt="Logo da empresa">
        <section class="options">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/clientes">Clientes</RouterLink>
            <RouterLink to="/temas">Temas</RouterLink>
            <RouterLink to="/itens">Itens</RouterLink>
            <RouterLink to="/alugueis">Alugueis</RouterLink>
        </section>
    </nav>
</template>

<style scoped>
nav {
    height: 8vh;
    width: 100vw;
    background-color: rgb(255, 255, 255);
    box-shadow: rgb(159 159 159 / 45%) 0px 0px 20px;
    display: flex;
    padding-right: 1em;
    margin-bottom: 2em;
}

a {
    text-decoration: none;
    color: #A73C8C;
    font-weight: bold;
    margin-left: 1em;
    text-align: center;
}

.options {
    display: flex;
    align-items: center;
    margin-left: 55%;
}

img {
    height: 8vh;
}
</style>
