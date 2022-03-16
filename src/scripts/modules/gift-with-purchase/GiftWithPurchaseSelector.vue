<template>
  <section>
    <h1 
      class="gwp-selector__heading leading-1 font-primary uppercase font-bold tracking-wide text-e16 mb-e4" 
      v-if="gwp.raw.upsell_heading">
      {{ gwp.raw.upsell_heading }}
    </h1>
    <p 
      class="gwp-selector__subheading font-body text-e14 leading-9 mb-e12" 
      v-if="gwp.raw.upsell_subheading">
      {{ gwp.raw.upsell_subheading }}
    </p>
    <div class="gwp-selector__offer-container flex justify-between items-start flex-wrap">
      <GiftWithPurchaseOffer 
        v-for="offer in gwp.offers"
        :key="offer.benefit.id"
        class="bg-white p-e16 relative text-center mb-e8 border transition-colors duration-300 cursor-pointer h-e256"
        :class="{
          'opacity-40 pointer-events-none cursor-default': !offer.triggerActive,
          'border-gray-breadcrumbs': !offer.selected,
          'border-red-500': offer.selected,
        }"
        :image="offer.benefit.settings.image"
        :imageAlt="offer.benefit.settings.image_alt"
        :onClick="() => gwp.toggleOffer(offer)"
        :selected="offer.selected"
        :uid="offer.benefit.id"
        :type="offer.benefit.type"
        :title="offer.benefit.settings.text">
        <GiftWithPurchaseVariantSelect
          v-if="offer.collectingVariantOptions && !offer.selected"
          @click.stop 
          :onComplete="offer.select"
          :product="offer.benefit.settings.product"
          />
      </GiftWithPurchaseOffer>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import giftWithPurchaseController from './GiftWithPurchase';
import GiftWithPurchaseOffer from './GiftWithPurchaseOffer.vue';
import GiftWithPurchaseVariantSelect from './GiftWithPurchaseVariantSelect.vue';

@Component({
  components: { 
    GiftWithPurchaseOffer,
    GiftWithPurchaseVariantSelect
  }
})
export default class SideCartGiftWithPurchase extends Vue {
  @Prop() readonly cart!: ShopifyCart;
  
  gwp = giftWithPurchaseController;

  mounted() {
    this.gwp.update(this.cart);
  }

  @Watch('cart')
  onCartUpdate () {
    this.gwp.update(this.cart);
  }
}
</script>
