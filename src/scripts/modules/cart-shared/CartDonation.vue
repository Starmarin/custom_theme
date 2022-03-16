<template>
  <section>
    <button 
      class="donation__close absolute p-e8 mr-e12 mt-e18 right-0 top-0"
      @click="() => onClose && onClose()">
      <Icon name="close" size="12px"></Icon>
    </button>
    <h1 class="donation__heading font-primary text-e16 leading-5 tracking-wider font-bold uppercase text-center mx-auto mb-e4 max-w-4/5">{{ heading }}</h1>
    <img
      class="donation__image mx-auto mb-e4" 
      :src="image" 
      :alt="imageAlt">
    <fieldset 
      class="space-y-e12 mb-e16"
      v-if="product">
      <AsyncButton 
        class="async--secondary w-full py-e12 text-center border border-white bg-white hover:border-red-500 \
        transition-colors duration-300 color-black bfx-price-container"
        v-for="(variant, index) in product.variants.slice(0, 5)" 
        :key="variant.id"
        :promise="addItemPromises[index]"
        @click="selectItem(variant)"
        :aria-label="`{{ 'cart.general.aria_donate' | t }} ${variant.option1}`">
        <span class="donation__button-text font-body font-bold text-e14 tracking-widest bfx-price">{{variant.option1}}</span>
      </AsyncButton>
    </fieldset>
    <p class="font-body text-e11 leading-9 text-center">{{subText}}</p>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from "vue-class-component";
import { Prop, Watch } from 'vue-property-decorator';
import Icon from '../../components/Icon.vue';
import AsyncButton from '../../components/AsyncButton.vue';

type AddItemState = null|Promise<any>;

@Component({
  components: {
    Icon,
    AsyncButton
  }
})
export default class CartDonation extends Vue {
  @Prop() readonly image!: string;

  @Prop() readonly imageAlt!: string;

  @Prop() readonly heading!: string;
  
  @Prop() readonly subText!: string;

  @Prop() readonly onClose!: () => void;

  @Prop() readonly onAddItem!: (variant: ShopifyVariant) => Promise<any>;

  @Prop() readonly product!: ShopifyProduct;

  @Prop() readonly onComplete!: () => void;

  addItemPromises: AddItemState[] = this.product.variants.map(() => null);

  selectItem (variant: ShopifyVariant) {
    const index = this.product.variants.indexOf(variant);
    const promise = this.onAddItem(variant);
    
    this.$set(this.addItemPromises, index, promise)
      .then(() => {this.onClose();});
  }
}
</script>

<style lang="scss" scoped>
  h1 {
    width: 90%;
  }

  // override some of async--secondary's styles
  .async--secondary {
    background: white;
    color: black;
  }
</style>