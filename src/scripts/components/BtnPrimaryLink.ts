/* eslint-disable */
import Btn from './Btn.vue';
// @ts-ignore
import { withProps } from '../lib/vue-util.js';

export default withProps(Btn, {
  buttonClasses: [
    'button--primary', 
    'bg-btn-primary_main',
    'text-white', 
    'uppercase',
    'flex',
    'justify-center',
    'items-center',
    'hover:bg-btn-primary_hover',
    'focus:bg-btn-primary_focus',
    'py-3',
    'px-0',
    'rounded-e2'
  ],
  contentClasses: ['font-primary', 'font-bold', 'tracking-header'],
  rippleClasses: ['bg-btn-primary_pressed', 'text-gray-300'],
  tag: 'a'
})
