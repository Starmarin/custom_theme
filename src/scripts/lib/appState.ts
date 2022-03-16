import Vue from 'vue';
import cloneDeep from 'lodash/cloneDeep';

const appState = Vue.observable(cloneDeep(__BVA__));

export default appState;
