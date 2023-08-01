import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Dashboard from '../views/Dashboard.vue'
import Itens from '../views/Itens/Itens.vue'
import FormItens from '../views/Itens/FormItens.vue'
import Temas from '../views/Temas/Temas.vue'
import FormTemas from '../views/Temas/FormTemas.vue'
import FormAlugueis from '../views/alugueis/FormAlugueis.vue';
import Alugueis from '../views/alugueis/Alugueis.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Dashboard
    },
    {
      path: '/itens',
      name: 'itens',
      component: Itens
    },
    {
      path: '/form-itens',
      name: 'form-itens',
      component: FormItens
    },
    {
      path: '/edit-itens/:id',
      name: 'edit-itens',
      component: FormItens
    },
    // Caminhos para Temas
    {
      path: '/temas',
      name: 'temas',
      component: Temas
    },
    {
      path: '/form-temas',
      name: 'form-temas',
      component: FormTemas
    },
    {
      path: '/edit-temas/:id',
      name: 'edit-temas',
      component: FormTemas
    },
    {
      path: '/alugueis',
      name: 'alugueis',
      component: Alugueis
    },
    {
      path: '/form-alugueis',
      name: 'form-alugueis',
      component: FormAlugueis
    },
    {
      path: '/edit-alugueis/:id',
      name: 'edit-alugueis',
      component: FormAlugueis
    },
  ]
})

export default router
