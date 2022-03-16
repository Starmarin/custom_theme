/* eslint-disable */
import Btn from './Btn.vue';
// @ts-ignore
import { withProps } from '../lib/vue-util.js';

export default withProps(Btn, {
  buttonClasses: [
    'btn--tertiary',
    'bg-btn-tertiary_main',
    'text-black',
    'uppercase',
    'border-black',
    'border-2',
    'hvr-sweep-to-right',
    'focus:text-white',
    'focus:bg-btn-tertiary_focus',
    'py-e10',
    'px-14',
    'rounded-e2'
  ],
  contentClasses: ['font-primary', 'font-bold', 'tracking-header'],
  rippleClasses: ['bg-btn-tertiary_pressed', 'text-gray-300'],
})
