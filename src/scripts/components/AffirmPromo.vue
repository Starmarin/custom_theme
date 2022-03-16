/* eslint-disable */
<template>
  <div :id="currentId" class="affirm-promo"></div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';
import { uniqueId } from '../lib/util';

@Component
export default class AffirmPromo extends Vue {
  @Prop() readonly price!: number;

  @Prop() readonly id!: string;

  promoComponent!: any;

  additionalId = uniqueId();

  get currentId() {
    return `affirm-${this.id + this.additionalId}`;
  }

  mounted() {
    this.init();
  }

  init(intervalId = 0) {
    if (window.affirm && window.affirm.jsReady) {
      window.clearTimeout(intervalId);
      window.affirm.jsReady(this.renderComponent);
    } else {
      const interval = setTimeout(() => {
        this.init(interval);
      }, 500);
    }
  }

  renderComponent() {
    this.promoComponent = window.affirm.ui.components.create('promo', {
      amount: this.price,
      pageType: 'product',
      affirmLogoColor: 'black',
      learnMoreShow: false,
    });

    this.promoComponent.render(`#${this.currentId}`);
  }

  updated() {
    this.renderComponent();
  }
}
</script>
