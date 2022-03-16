/* eslint-disable */
/**
 * @file Vue related Higher order functions or components
 *  - Provider
 *  - withProps
 */

import toPairs from 'lodash/toPairs';

/** @alias Object.assign */
const merge = (a, b) => Object.assign(a, b);

/** Recursively find the closest vue parent with data that is meant to be merged
 *  with data from another provider and passed down
 *
 * @param {Vue} node
 * @return {?Object}
 */
function closestComposeData(node) {
  if (node.$attrs.__composeData) return node.$attrs.__composeData;
  if (node.$parent) return closestComposeData(node.$parent);
}

/** recursively convert vuex getters and state functions into js getters
 *
 * @function
 * @param {*} value
 * @param {Vue} ctx - needed to call the getter function with the proper "this"
 * @return {*} - value but with some properties coverted to getters
 */
function transformMappedGetters(value, ctx) {
  if (!(value instanceof Object)) return value;
  const keys = Object.keys(value);

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const propValue = value[key];

    if (typeof propValue === 'function' && propValue.vuex) {
      const desc = Object.getOwnPropertyDescriptor(value, key);
      if (!desc.get) {
        Object.defineProperty(value, key, {
          get: propValue.bind(ctx),
          set: () => {},
        });
      }
    }

    transformMappedGetters(propValue, ctx);
  }

  return value;
}

/** Bind props to a vue component
 *
 * @function
 * @param {VueComponent} component
 * @param {Object} props
 * @returns {VueComponent} - component with bound props
 * @example
 * import { mapGetters, mapActions, mapState } from 'vuex';
 *
 * const props = {
 *   provide: {
 *     ...mapGetters(['myGetter']),
 *     ...mapActions(['myAction']),
 *     ...mapState({
 *       myState: (state) => state.my.test.state,
 *     }),
 *   },
 * };
 *
 * export default withProps(Provider, props); // <--- returns a component with bound props
 */
export function withProps(component, props) {
  return {
    name: 'WithProps',
    render(h) {
      const transformedProps = transformMappedGetters(props, this);
      return h(
        component,
        {
          props: transformedProps,
          attrs: {
            /* This is a way to pass data through componenets without the child
             * needing to declare the data as props.
             *
             * set merged composedata so it can be picked up by the next child component
             */

            __composeData: transformedProps,
          },
          on: this.$listeners,
        },
        this.$slots.default,
      );
    },
  };
}

/** Gets data and injects it as props to it's child component.
 *  Use this with {@link withProps} to create a reusable provider component.
 *
 * @component Provider
 * @prop {Object} provide
 * @example
 * <Provider :provide="{ test: 'testing' }">
 *   <ProductForm>    <-- recieves prop test
 * </Provider>
 * @example
 * <Provider :provide="{ test: 'testing' }">
 *   <ProductForm :product="product">    <-- you can still add props directly to the child component
 * </Provider>
 * @example
 * // providers can also be composed with components inbetween
 * <Provider1 :provide="{ test1: 'testing1' }">
 *   <AnotherComponent>
 *     <Provider2 :provide="{ test2: 'testing2' }">
 *       <ProductForm>    <-- recieves props test1 AND test2
 *     </Provider2>
 *   </AnotherComponent> <-- recieves props test1
 * </Provider1>
 */
export const Provider = {
  name: 'Provider',
  props: {
    provide: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  render() {
    const vnodes = this.$slots.default || [];
    const composeData = this.$parent && closestComposeData(this.$parent);
    let mergedComposedDataAndProvide = this.provide;

    if (composeData) {
      mergedComposedDataAndProvide = merge(composeData.provide || composeData, this.provide);
    }

    for (let i = 0; i < vnodes.length; i += 1) {
      const vnode = vnodes[i];

      if (vnode.componentInstance && vnode.componentInstance.$props) {
        /* the component has been created refresh the props */
        toPairs(mergedComposedDataAndProvide).forEach(([key, value]) => {
          vnode.componentInstance.$set(vnode.componentInstance.$props, key, value);
        });
      } else if (vnode.componentOptions) {
        /* the component hasn't been created yet, provide initial props */
        vnode.componentOptions.propsData = merge(vnode.componentOptions.propsData || {}, mergedComposedDataAndProvide);
      }
    }

    /* This is a way to pass data through componenets without the child
     * needing to declare the data as props.
     *
     * set merged composedata so it can be picked up by the next child component
     */

    this.$attrs.__composeData = mergedComposedDataAndProvide;

    return vnodes;
  },
};

export function registerComponents(components) {
  return console.log(components);
}
