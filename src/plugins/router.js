import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
import Series from '../views/Series';
import Episode from '../views/Episode';
import Character from '../views/Character';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/breakingBad',
      name: 'Breaking Bad',
      component: Series,
      props: true,
    },
    {
      path: '/betterCallSaul',
      name: 'Better Call Saul',
      component: Series,
      props: true,
    },
    {
      path: '/episode/:id',
      name: 'Episode',
      component: Episode,
    },
    {
      path: '/character/:name',
      name: 'Character',
      component: Character,
    }
  ],
});


export default router;
