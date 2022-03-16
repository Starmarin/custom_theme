/* eslint-disable */
import Btn from './Btn.vue';
// @ts-ignore
import { withProps } from '../lib/vue-util.js';

export default withProps(Btn, {
  buttonClasses: ['btn--link', 'bg-white', 'text-black', 'hover:bg-gray-100', 'border', 'border-gray-200'],
  rippleClasses: ['bg-gray-200'],
})
