/* eslint-disable */
/**
 * @file vuex module abstraction for creating provider mixins
 * @author Corey Burkhart | BVA
 */

import { createNamespacedHelpers, mapState, mapActions, mapGetters, mapMutations } from 'vuex';
const { withProps, Provider } = require('./vue-util');

export interface BaseModuleOptions {
  namespace?: string;
  namespaced?: boolean;
}

export default class BaseModule {
  namespace?: string;
  namespaced?: boolean;
  state = {};
  getters = {};
  actions = {};
  mutations = {};

  constructor({ namespace, namespaced = false }: BaseModuleOptions) {
    this.namespace = namespace;
    this.namespaced = namespaced;
  }

  /** Get the namespaced accessor of a key
   * @param {String} key - action, getter, state, mutation name
   * @return {String}
   * @example ```js
   * 	// for a module with the namespace "myModule" and action "myAction"
   * 	this.getNamespaced('myAction') // "myModule/myAction"
   * ```
   */
  getNamespaced(key: string) {
    return this.namespace && this.namespaced ? `${this.namespace}/${key}` : key;
  }

  /** Get a mixin with all state, getters, actions, and mutations for this module
   * @return {Object}
   */
  getProvider() {
    let stateMapper = mapState,
      actionsMapper = mapActions,
      gettersMapper = mapGetters,
      mutationsMapper = mapMutations;
    if (this.namespaced && !this.namespace) throw new Error('Namespaced modules require a namepace');

    if (this.namespaced && this.namespace) {
      let { mapState, mapActions, mapGetters, mapMutations } = createNamespacedHelpers(this.namespace);
      stateMapper = mapState;
      actionsMapper = mapActions;
      gettersMapper = mapGetters;
      mutationsMapper = mapMutations;
    }

    return withProps(Provider, {
      provide: {
        ...actionsMapper(Object.keys(this.actions)),
        ...mutationsMapper(Object.keys(this.mutations)),
        ...gettersMapper(Object.keys(this.getters)),
        ...stateMapper(Object.keys(this.state)),
      },
    });
  }
}
