/* eslint-disable */
import Btn from './Btn.vue';
// @ts-ignore
import { withProps } from '../lib/vue-util.js';

export default withProps(Btn, {
  buttonClasses: ['button--secondary', 'bg-white', 'text-red-500', 'button', 'hover:border-red-500', 'shadow-sm', 'border-gray-200', 'border', 'border-solid'],
  rippleClasses: ['bg-red-200'],
  tag: 'a'
})
