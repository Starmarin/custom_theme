/* eslint-disable */
import AOS from 'aos';
import renderModule from './lib/renderModule';
import * as RegistrationPage from './modules/registration-page/RegistrationPage';
import * as ErrorPage from './modules/error-page/ErrorPage';
import '@/scripts/lib/filters';

window.addEventListener('DOMContentLoaded', () => {
  renderModule(RegistrationPage);
  renderModule(ErrorPage);

  document.querySelector('html')?.classList.add('vue-loaded');
});

window.addEventListener('load', () => {
  document.querySelector('html')?.classList.add('loaded');
});

document.querySelector('html')?.classList.remove('no-js');
AOS.init({
  delay: 100,
});
