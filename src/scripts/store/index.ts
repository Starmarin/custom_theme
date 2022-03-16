import Vue from 'vue';
import Vuex from 'vuex';
import { ModuleTree } from 'vuex/types/index';
import base from './base';

Vue.use(Vuex);

export default (modules: ModuleTree<any>) => {
  return new Vuex.Store({
    ...base,
    modules,
  });
};
