import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';
import getters from './getters';
import { createLogger } from '../plugins/vue-logger';
import AppConfig from "../config/app.config.js";
Vue.use(Vuex);

const debug = AppConfig.PROCESS=='dev' ? true : false;

export default new Vuex.Store({
  modules,
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
