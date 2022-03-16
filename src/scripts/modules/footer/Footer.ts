import './footer.scss';
import Vue from 'vue';
import Component, { mixins } from 'vue-class-component';
// import { Prop } from 'vue-property-decorator';
import getProps from '../../lib/getProps';
import LazyLoad from '../../components/LazyLoad';

export const NAME = 'Footer';

export default function(el: HTMLElement) {
  @Component({
    name: NAME,
    el,
    propsData: getProps(el),
    components: {
      LazyLoad
    }
  })
  class Footer extends mixins(LazyLoad) {
    subscriptionEmail = '';

    submitsEmail() {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'email_submit',
        'submittedEmail': this.subscriptionEmail
      });    
    }

    scrollToAnchor(target: string) {
      const targetSection = document.querySelector(target);
      targetSection?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }

  return new Vue(Footer);
}
