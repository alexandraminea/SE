import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Board from '@/components/Board'

Vue.use(Router)

const routes = [
  { path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  { path: '/board/:id/:boardId', component: Board },
  { path: '/board/:id/:boardId/:listId', component: Board }
]

export default new Router({
  routes: routes
})
