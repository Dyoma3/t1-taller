import Vue from 'vue'
import App from './App.vue';
import VueObserveVisibility from 'vue-observe-visibility';
import vuetify from './plugins/vuetify';
import router from './plugins/router';

Vue.use(VueObserveVisibility);

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
