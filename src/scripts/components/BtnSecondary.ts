/* eslint-disable */
import Btn from './Btn.vue';
// @ts-ignore
import { withProps } from '../lib/vue-util.js';

export default withProps(Btn, {
  buttonClasses: [
    'btn--secondary',
    'bg-btn-secondary_main',
    'text-white',
    'uppercase',
    'hover:bg-btn-secondary_hover',
    'focus:bg-btn-secondary_focus',
    'py-3',
    'px-14',
    'rounded-e2'
  ],
  contentClasses: ['font-primary', 'font-bold', 'tracking-header', 'flex', 'justify-center', 'items-center', 'flex-wrap'],
  rippleClasses: ['bg-btn-secondary_pressed', 'text-gray-300'],
})
