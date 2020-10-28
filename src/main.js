import Vue from 'vue';
import Vuex from 'vuex';
import { BootstrapVue } from 'bootstrap-vue';
import './assets/styles.css';

import state from '@/store/state';
import getters from '@/store/getters';
import mutations from '@/store/mutations';
import actions from '@/store/actions';

import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

new Vue({
  render: h => h(App),
  store
}).$mount('#app');
