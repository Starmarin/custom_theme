/* eslint-disable */
import Btn from './Btn.vue';
// @ts-ignore
import { withProps } from '../lib/vue-util.js';

export default withProps(Btn, {
  buttonClasses: ['btn--pill', 'bg-red-700', 'text-white', 'button', 'uppercase', 'hover:bg-red-400'],
  rippleClasses: ['bg-red-500'],
  tag: 'a'
})
