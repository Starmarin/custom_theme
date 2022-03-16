<template>
  <div class="pt-e12 md:max-w-e45 w-full flex justify-end items-end flex-col">
    <div class="flex flex-nowrap w-full items-center justify-between mb-e8 gift-hook">
      <p 
        class="text-e11 font-body font-semibold" 
        v-html="`{{ 'cart.general.rewards_promo_text' | t }}`"></p>
      <p 
        class="text-e11 font-body font-semibold text-blue-200 ml-1"
        v-html="`{{ 'cart.general.rewards_total' | t }}`.replace(escape('<points>'), pointBalance)"></p>
    </div>
    <div class="mb-e16 pt-e10 w-full gift-hook">
      <template v-for="option in redemptionOptions">
        <input 
          tabindex="0"
          :key="`${option.id}-input`"
          type="radio" 
          name="reward-option" 
          :id="`rewards-${option.id}`"
          :checked="selectedOption === option"
          :style="{'display': appliedOption && appliedOption !== option ? 'none' : 'flex'}"
          @change="() => onOptionSelect(option)"
          :disabled="option.costInPoints >= pointBalance">
        <label 
          class="flex flex-nowrap items-center justify-between w-full px-e20 py-e14 bg-gray-100 \
          border-solid border border-gray-breadcrumbs transition-colors duration-300 \
          text-e12 leading-none"
          :style="{'display': appliedOption && appliedOption !== option ? 'none' : 'flex'}"
          :title="pointBalance > option.costInPoints ? '' : unescape(notEnoughPointsText)"
          :for="`rewards-${option.id}`"
          :key="`${option.id}-label`">
          <span 
            class="font-body font-semibold uppercase" 
            v-if="option.discountType === 'percentage'">
            {{ option.discountPercentage + '% ' }}<template v-pre>{{ 'cart.label.rewards_discount_percentage' | t }}</template>
          </span>
          <span 
            class="font-body font-semibold uppercase" 
            v-if="option.discountType === 'fixed_amount'">
            {{ option.discountAmountCents | moneyWithoutTrailingZeros }} <template v-pre>{{ 'cart.label.rewards_discount_percentage' | t }}</template>
          </span>
          <transition name="fade" mode="out-in">
            <span 
              class="font-body" 
              v-if="appliedOption && appliedOption.id === option.id"
              v-html="`{{ 'cart.general.rewards_option_applied' | t }}`"></span>
            <span 
              class="font-body" 
              v-else>
              {{ option.costInPoints }} <template v-pre>{{ 'cart.label.points' | t }}</template>
            </span>
          </transition>
        </label>
      </template>
    </div>
    <AsyncButton 
      v-if="!appliedOption"
      :disabled="_applyDisabled"
      class="w-full async--secondary bg-blue-200"
      :promise="onApplyPromise"
      @click="_onApply"
      v-html="`{{ 'cart.general.rewards_apply' | t }}`" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import escape from 'lodash/escape'
import unescape from 'lodash/unescape'
import AsyncButton from '../../components/AsyncButton.vue';
import Icon from '../../components/Icon.vue';
import { formatCurrency, moneyWithoutTrailingZeros } from '../../lib/util'



@Component({
  components: {
    AsyncButton,
    Icon
  },
  filters: {
    formatCurrency,
    moneyWithoutTrailingZeros
  }
})
export default class CartRewardsSelector extends Vue {
  @Prop() readonly redemptionOptions!: any[];

  @Prop() readonly selectedOption!: any;

  @Prop() readonly appliedOption!: any;

  @Prop() readonly pointBalance!: number;

  @Prop() readonly onOptionSelect!: (option: any) => void

  @Prop() readonly onApply!: (selectedOption: any) => Promise<any>;
  
  @Prop() readonly onUnapply!: (appliedOption: any) => Promise<any>;

  @Prop({ default: `{{'cart.general.rewards_not_enough_points' | t}}`}) readonly notEnoughPointsText!: string;

  onApplyPromise: null|Promise<any> = null;

  escape = escape;

  unescape = unescape;

  _onApply() {
    this.onApplyPromise = this.onApply(this.selectedOption)
  }

  get _applyDisabled () {
    return !this.redemptionOptions.some(option => this.pointBalance >= option.costInPoints)
  }

  mounted(){
  }
}
</script>

<style scoped lang="scss">
  input[type="radio"] {
    @apply sr-only;
  }

  input + label + input + label {
    @apply mt-e10;
  }

  input:focus + label {
    @apply border-primary-700;
  }

  input:checked + label {
    @apply border-blue-200 text-blue-200;
  }

  input:disabled + label {
    @apply opacity-40;
  }

  input:not(:disabled) + label:hover,
  input:not(:disabled):focus + label {
    @apply border-blue-200  text-blue-200;
  }

  
  .gift-open .gift-hook {
    @apply max-w-full;
  }
  .sidecart-rewards {
    @apply max-w-full;
    .gift-hook {
      @apply max-w-full;
    }
  }
</style>