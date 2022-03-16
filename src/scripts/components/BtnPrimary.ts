/* eslint-disable */
import Btn from './Btn.vue';
// @ts-ignore
import { withProps } from '../lib/vue-util.js';

export default withProps(Btn, {
  buttonClasses: [
    'btn--primary',
    'bg-btn-primary_main',
    'text-white',
    'uppercase',
    'border-2',
    'flex',
    'justify-center',
    'items-center',
    'border-transparent',
    'hover:bg-btn-primary_hover',
    'focus:bg-btn-primary_focus',
    'focus:text-gray-300',
    'focus:border-util-focus',
    'py-3',
    'px-0',
    'rounded-e2' 
  ],
  contentClasses: ['font-primary', 'font-bold', 'tracking-header'],
  rippleClasses: ['bg-btn-primary_pressed', 'text-gray-300'],
});
