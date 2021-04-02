import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
import Series from '../views/Series';
import Episode from '../views/Episode';

Vue.use(VueRouter);

const router = new VueRouter({
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
    },
    {
      path: '/betterCallSaul',
      name: 'Better Call Saul',
      component: Series,
    },
    {
      path: '/episode/:id',
      name: 'episode',
      component: Episode,
    },
  ],
});


export default router;
