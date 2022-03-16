/* eslint-disable */
import './promo-bar.scss';

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

export const NAME = 'PromoBar';

function getProps(el: HTMLElement) {
  if (!el.dataset.props) return {};
  return JSON.parse(el.dataset.props);
}
export default function (el: HTMLElement) {
  @Component({
    name: NAME,
    el,
    propsData: getProps(el),
  })
  class PromoBar extends Vue {
    @Prop({ default: "" }) readonly promoContent!: String;

    promoStatus = true;
    
    hidePromo() {
      let promoKey = 'promoObject';
      let promoContent = this.promoContent;
      let promoObject = { topPromo: 'hidden', promoTime: Date.now(), promoContent: promoContent };
      localStorage.setItem(promoKey, JSON.stringify(promoObject));
      this.promoStatus = false;
    }

    mounted() {
      try {
        let promoObject = JSON.parse(localStorage.getItem('promoObject') || ''); 
        let timeDiff = Date.now() - promoObject.promoTime;
        let timeDiffCalculated = Math.round(timeDiff / (1000 * 60 * 60 * 24));

        if (promoObject.promoContent != this.promoContent) {
          // if message has changed show block
          this.promoStatus = true;
        } else if (timeDiffCalculated >= 7) {
          // if more than 7 days have passed, show block
          this.promoStatus = true;
        } else if(promoObject.topPromo == "hidden") {
          this.promoStatus = false;
        } else {
          this.promoStatus = true;
        }
      } catch (e) {
        this.promoStatus = true;        
      }

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'promotion-impression',
        'ecommerce': {
          'promoView': {
            'promotions': [
              {
                'id': '',
                'name': 'top-promo-bar',
                'promoContent': this.promoContent,
                'creative': '',
                'position': '',
                'start': ''
              }
            ]
          }
        } 
      });
      
    }
  }

  return new Vue(PromoBar);
}


