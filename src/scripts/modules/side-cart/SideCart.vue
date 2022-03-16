<template>
  <!-- TODO: add focus lock. test for laggy animation after -->
  <div class="sidecart-modal leading-4">
    <CartHeader 
      class="sidecart-modal__header bg-gray-700 text-white"
      :itemCount="gwpCartCount" >
      <button 
        class="p-e24 bg-gray-200 hover:opacity-60 transition-opacity duration-300" 
        aria-label="close cart modal"
        @click="closeSideCart">
        <Icon name="modal-close" size="18px" role="presentation" aria-hidden="true" />
      </button>
    </CartHeader>
    <CartShippingProgress 
      v-show="settings.cart_free_shipping_enable && state.free_shipping_visible"
      :cartSubtotalCents="freeShippingProgressData.progress"
      :freeShippingThresholdCents="freeShippingProgressData.threshold" />
    <div class="sidecart__scrolling-container relative overflow-y-scroll pb-e80">  <!-- for SideCartGiftMessageModal drawer -->
      <template v-if="cart.item_count > 0">
        <SideCartSubtotal 
          class="leading-4 px-e14 md:px-e40 pt-e16 md:pt-e22"
          :subtotal="cart.total_price"
          :onCheckout="goToCheckout">
        </SideCartSubtotal>
        <div class="flex items-center justify-between px-e14 pb-e16 md:px-e40">
          <a 
            class="font-primary font-bold uppercase text-e12 underline tracking-widest text-black transition--red cursor-pointer" 
            @click="goToCart"
            v-html="`{{ 'cart.general.to_cart_page' | t }}`"></a>
          <BtnAccordion 
            v-if="initialized && redemptionOptions.length > 0 && currentStore != 'eu' && isLoggedIn"
            class="font-primary font-bold uppercase text-e12 underline tracking-widest text-blue-200"
            :active="pointsDrawerOpen"
            :iconColor="'#3b30fe'"
            @update:active="pointsDrawerOpen = !pointsDrawerOpen"
            :text="`{{ 'cart.general.redeem_points' | t }}`" />
          <a v-if="!isLoggedIn"
            class="font-primary font-bold uppercase text-e12 underline tracking-widest text-blue-200"
            href="/account"> 
              {{ state.language.login_redeem }}
          </a>
        </div>
        <TransitionExpand>
          <CartRewardsSelector
            v-if="pointsDrawerOpen && initialized && redemptionOptions.length > 0"
            class="px-e14 md:px-e40 w-full sidecart-rewards mb-4"
            :onOptionSelect="selectOption"
            :appliedOption="appliedOption"
            :selectedOption="selectedOption"
            :onApply="apply"
            :redemptionOptions="redemptionOptions"
            :pointBalance="customerDetails.pointsBalance" />
        </TransitionExpand>
      </template>
      <CartEmpty 
        class="text-center md:py-e120 py-e90 px-e56 sm:px-0 mb-4"
        v-if="cart.item_count === 0"
        :stack-buttons="true" />
      <template v-else>
        <div
          class="border-t border-b border-gray-300 border-solid overflow-y-scroll">
          <transition-group name="fade">
            <SideCartLineItem 
              class="sidecart__line-item"
              v-for="(lineItem, lineItemIndex) in gwpFilteredLineItems" 
              :key="`${lineItem.id}-${lineItemIndex}-sidecart-line-item`"
              :product="lineItem.product"
              :lineItem="lineItem"
              :promoText="lineItem.product ? lineItem.product.metafields.pdp.promo_text : ''"
              :onItemRemove="removeItem"
              :onItemUpdate="$store.dispatch.bind(null, 'updateItemQuantity')">
              <Badge 
                class="inline-block px-4 py-e4 tracking-header uppercase text-xxs font-bold mb-e4"
                slot="badge"
                v-if="lineItem.product" 
                :product="lineItem.product"
                :isCustomized="isCustomized(lineItem)"
                :defaultVariant="lineItem.product.variants.find(v => v.id === lineItem.variant_id)" />
            </SideCartLineItem>
          </transition-group>
        </div>
        <button 
          class="font-primary font-bold uppercase whitespace-no-wrap text-center rounded-e2 bg-black text-white text-e12 tracking-widest mt-4 ml-5 px-5 py-3 min-w-0 leading-none bfx-remove-element"
          v-if="settings.cart_gift_message_enable"
          @click="giftMessageDrawerOpen = !giftMessageDrawerOpen"
          v-html="cart.note ? `{{ 'cart.general.gift_note_edit' | t }}` : `{{ 'cart.general.gift_note_add' | t }}`" />
          <div class="p-3 bg-gray-200 text-gray-600 italic text-megamenu_sub w-full font-body" v-if="giftMessage != ''" v-html="giftMessage"></div>
      </template>
      <transition name="slide-in-sidecart" :duration="300">
        <SideCartGiftMessageModal 
          class="sidecart__gift-message-container fixed right-0 bg-white z-80 w-screen"
          v-if="giftMessageDrawerOpen"
          :onClose="() => giftMessageDrawerOpen = false"
          :onSubmit="updateNote"
          @click="giftMessageDrawerOpen = false"
          :message="giftMessage"
          @update:message="v => giftMessage = v" />
      </transition>
      <transition name="fade">
        <SideCartDonationAdvertisement 
          class="mt-e18"
          v-if="cart.item_count > 0 && settings.cart_donation_enable && settings.cart_donation_product && !donationComplete" 
          :image="`{{ settings.cart_donation_image | img_url: 'master' }}`"
          :imageAlt="`{{ settings.cart_donation_image.alt }}`"
          :heading="`{{ settings.cart_donation_heading }}`"
          :atcText="`{{ 'cart.general.donation_cta' | t }}`"
          :onCtaClick="() => donationDrawerOpen = !donationDrawerOpen" />
      </transition>
      <GiftWithPurchaseSelector 
        v-if="gwpEnabled && cart.item_count > 0"
        class="py-e20 px-e16 bg-gray-200 text-center mt-e16"
        :cart="cart"
        :lineItems="cart.items"
        />
    </div>
    <TransitionExpand 
      :duration="300" 
      v-if="settings.cart_donation_enable && settings.cart_donation_product">
      <CartDonation 
        class="absolute left-0 bottom-0 w-full text-black px-e16 pt-e20 pb-e70 md:px-p10 z-30 bg-gray-200"
        v-if="donationDrawerOpen" 
        :image="`{{ settings.cart_donation_image | img_url: 'master' }}`"
        :imageAlt="`{{ settings.cart_donation_image.alt }}`"
        :heading="`{{ settings.cart_donation_heading }}`"
        :subText="`{{ settings.cart_donation_subtext }}`"
        :onClose="() => donationDrawerOpen = false"
        :onAddItem="addItem" 
        :product="donationProduct" />
    </TransitionExpand>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import FocusLock from 'vue-focus-lock';

/** Shared components */
import CartHeader from '../cart-shared/CartHeader.vue';
import CartShippingProgress from '../cart-shared/CartShippingProgress.vue';
import CartEmpty from '../cart-shared/CartEmpty.vue';
import CartSubtotal from '../cart-shared/CartSubtotal.vue';
import SideCartSubtotal from '../cart-shared/SideCartSubtotal.vue';
import CartRewardsSelector from '../cart-shared/CartRewardsSelector.vue';
import CartDonation from '../cart-shared/CartDonation.vue';
import CartLogic from '../cart-shared/CartLogic';
import CartDonationLogic from '../cart-shared/CartDonationLogic';
import CartRewardsLogic from '../cart-shared/CartRewardsLogic';

/** SideCart specific components */
import SideCartDonationAdvertisement from './SideCartDonationAdvertisement.vue';
import SideCartLineItem from './SideCartLineItem.vue';
import SideCartGiftMessageModal from './SideCartGiftMessageModal.vue';
import GiftWithPurchaseSelector from '../gift-with-purchase/GiftWithPurchaseSelector.vue';

/** Generic Components */
import Badge from '../../components/Badge.vue';
import BtnSecondary from '../../components/BtnSecondary';
import TransitionExpand from '../../components/TransitionExpand.vue';
import BtnAccordion from '../../components/BtnAccordion.vue';

@Component({
  components: { 
    CartHeader, 
    CartShippingProgress, 
    CartEmpty, 
    CartSubtotal, 
    SideCartSubtotal,
    SideCartLineItem, 
    CartRewardsSelector, 
    SideCartGiftMessageModal,
    SideCartDonationAdvertisement,
    CartDonation,
    Badge,
    GiftWithPurchaseSelector,
    BtnSecondary,
    BtnAccordion,
    TransitionExpand,
    FocusLock
  },
})
export default class SideCart extends mixins(CartLogic, CartDonationLogic, CartRewardsLogic) {
  @Prop() readonly cart!: ShopifyCart;

  settings = window.APPSTATE.sidecart_settings;

  gwpEnabled = !!__BVA__.gwp_data;

  gwpData = window.__BVA__.gwp_data;

  giftMessageDrawerOpen = false;

  pointsDrawerOpen = false;

  state =  window.APPSTATE;

  gwpCartCount = this.cart.item_count;

  currentStore = this.state.current_store;


  closeSideCart () {
    this.donationDrawerOpen = false;
    this.giftMessageDrawerOpen = false;
    this.$emit('close');
  }

  get isLoggedIn () {
    return !!this.state.customer;
  }
  
  get gwpFilteredLineItems () {
    let cartItems = [];
    let foundGWP = false;
    for(let i = 0; i < this.cart.items.length; i++){
      let foundSMGift = false;
      let foundSMID = false;
      let foundVisible = false;
      if(this.cart.items[i].properties != null) {
        for(let j = 0; j < this.cart.items[i].properties.length; j++){
          if(this.cart.items[i].properties[j].includes('_smid')){
            foundSMID = true;
          }
          if(this.cart.items[i].properties[j].includes('_smgift')){
            foundSMGift = true;
          }
          if(this.cart.items[i].properties[j].includes('_smvisible')){
            foundVisible = true;
          }
        }
      }
      if(!foundSMID || foundVisible || foundSMGift){
        cartItems.push(this.cart.items[i]);
      }
      if(foundSMID){
        foundGWP = true;
      }
    }
    if(foundGWP){
      this.gwpCartCount = this.cart.item_count - 1;
    }
    return cartItems;
  }

  isCustomized (item: any) {
    if (item.properties) {
      return item.properties.some((elem: any) => elem[0] === 'customisationId')
    }
    return false;
  }


  mounted(){
  }

  /** Check if the free shipping dummy product is in cart. See GWP. */
  get freeShippingProgressData () {
    const shouldForce = this.cart.items.some(item => item.properties?._smshipping);
    const defaultData = {
      progress: this.cart.total_price,  
      threshold: this.settings.cart_free_shipping_threshold
    }
    if(shouldForce) {
      return {
        progress: 2000,
        threshold: 1,
      }
    }
    return defaultData;
  }
}
</script>

<style lang="scss" scoped>
  .sidecart__gift-message-container {
    top: 112px;
    height: calc(100vh - 114px);
    @screen sm {
      max-width: 480px;
    }
  }

  .gift-note-btn:before {
    content: '';
    position: absolute;
    width: 14px;
    height: 14px;
    background-image: url('https://cdn.shopify.com/s/files/1/0506/4409/1049/files/check-white.svg');
    background-size: contain;
    background-repeat: no-repeat;
    left: 10px;
  }

  .sidecart__line-item + .sidecart__line-item {
    @apply border-t border-gray-300 border-solid;
  }

  .slide-in-sidecart-enter-active,
  .slide-in-sidecart-leave-active {
    right: 0;
    transition: right .3s ease-in-out;
  }

  .slide-in-sidecart-enter,
  .slide-in-sidecart-leave-to {
    transition: right .3s ease-in-out;
    right: -101vw;
  }

  .sidecart__scrolling-container {
    max-height: calc(100vh - 114px);
  }

  .sidecart-modal__header button {
    @apply text-gray-700;
  }
</style>

<style lang="scss">
  .sidecart-modal .gwp-offer {
    width: calc(50% - 4px);
  }
</style>