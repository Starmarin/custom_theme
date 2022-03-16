<template>
  <div class="text-0 bfx-remove-element">
    <progress v-if="meterWidthPercentage !== 0" 
      class="free-shipping__progress appearance-none h-e4 w-full"
      min="0" 
      max="100" 
      :value="meterWidthPercentage" 
      aria-labelledby="free-shipping-label">
    </progress>
    <p id="free-shipping-label bfx-price-container"
      class="bg-gray-misc p-e12 md:px-e16 text-static font-body bfx-price"
      v-html="displayText">
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import unescape from 'lodash/unescape';
import { formatCurrency } from '../../lib/util'

/** Get the % (0-100) until free shipping
  * @func percentToFreeShipping
  * @returns {Number} 0-100
  */
function getPercentToFreeShipping(totalPriceCents: number, scale: (n: number) => number) {
  if (!totalPriceCents) return 0;

  const percent = scale(totalPriceCents);

  if (percent >= 100) return 100;
  return percent;
}

/** Get the dollar amount until free shipping
  * @func getMoneyToFreeShipping
  * @returns {Number}
  */
function getMoneyToFreeShipping(totalPriceCents: number, freeShippingThresholdCents: number) {
  if (typeof totalPriceCents !== 'number') return freeShippingThresholdCents;

  const d = freeShippingThresholdCents - totalPriceCents;

  if (Math.sign(d) > 0 && d >= 0) {
    return d;
  }

  return -1;
}

function getScaleLinear([inMin, inMax]: [number, number], [outMin, outMax]: [number, number]) {
  return (num: number) => ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

@Component
export default class CartShippingProgress extends Vue {
  @Prop({ default: 50 * 100 }) readonly freeShippingThresholdCents!: number;

  @Prop({ default: 50 * 100 }) readonly cartSubtotalCents!: number;

  /** @prop freeShippingProgressText - <money> is replaced with the amount the user is away from free shipping */
  @Prop({ default: `{{ 'cart.general.free_shipping_meter_progress' | t }}`}) readonly freeShippingProgressText!: string;

  @Prop({ default: `{{ 'cart.general.free_shipping_meter_success' | t }}`}) readonly freeShippingSuccessText!: string;

  get scale () {
    return getScaleLinear([0, this.freeShippingThresholdCents], [0, 100]);
  }

  get meterWidthPercentage () {
    return getPercentToFreeShipping(this.cartSubtotalCents, this.scale);
  }

  get remainingMoneyToFreeShipping () {
    return getMoneyToFreeShipping(this.cartSubtotalCents, this.freeShippingThresholdCents);
  }

  get displayText () {
    const progressText = unescape(this.freeShippingProgressText)
      .replace('<money>', formatCurrency(this.remainingMoneyToFreeShipping / 100));
    return this.meterWidthPercentage >= 100 ? this.freeShippingSuccessText : progressText;
  }
}
</script>

<style scoped lang="scss">
.free-shipping__progress {
  &::-webkit-progress-bar {
    @apply bg-gray-100 h-e4;
  }

  &::-webkit-progress-value {
    @apply bg-red-500 h-e4;
  }
}
</style>