<template>
  <div
    class="cart mx-auto pb-e80 md:pb-e180 bfx-checkout-container">
    <CartEmpty
      class="text-center md:py-e120 py-e90 px-e56 sm:px-0 mb-4"
      v-if="cart.item_count === 0"
      :stack-buttons="true" />
    <template v-else>
      <div class="flex-col md:flex-row md:flex-no-wrap md:items-start justify-start text-0 md:pt-e20">
        <div class="cart__left align-top md:inline-block"> <!-- [START] cart desktop left -->
          <CartHeader
            class="bg-gray-700 text-white md:bg-white md:text-black"
            :itemCount="gwpCartCount" >
            <div class="bg-inherit h-e64 w-1/2 px-0 py-e8 flex justify-end items-center pr-e16">
              <a
                :href="`{{ settings.cart_continue_shopping }}`"
                class="link text-white md:text-black font-primary underline font-bold text-e12 uppercase tracking-widest"
                v-html="`{{ 'cart.general.continue_shopping' | t }}`">
              </a>
            </div>
          </CartHeader>
          <CartShippingProgress
            v-show="settings.cart_free_shipping_enable && state.free_shipping_visible"
            :cartSubtotalCents="freeShippingProgressData.progress"
            :freeShippingThresholdCents="freeShippingProgressData.threshold" />
          <div
            class="md:pt-e16">
            <transition-group name="fade">
              <component
                :is="$mq === 'sm' ? 'SideCartLineItem' : 'CartLineItem'"
                  class="sidecart__line-item border-b border-solid border-gray-300"
                  v-for="(lineItem, lineItemIndex) in gwpFilteredLineItems"
                  :key="`${lineItem.id}-${lineItemIndex}-cart-line-item`"
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
              </component>
            </transition-group>
          </div>
          <div class="hidden md:block">
            <div class="flex items-start justify-between px-e14 py-e16 md:px-0">
              <div class="flex flex-wrap w-1/2 mr-2">
                <div :class="{'w-full': giftMessageDrawerOpen, 'justify-between': giftMessageDrawerOpen}" class="flex rounded-e2  mr-1 items-center text-white bg-btn-secondary_main bfx-remove-element" v-if="settings.cart_gift_message_enable">  
                  <BtnSecondary
                    v-if="settings.cart_gift_message_enable"
                    class="font-primary font-bold text-center uppercase text-e12 tracking-widest pr-8 pl-8 pt-e12 min-w-0 leading-none rounded-none w-full bfx-remove-element"
                    @click="giftMessageDrawerOpen = !giftMessageDrawerOpen"
                    :href="`{{ routes.cart_url }}`"
                    v-html="`{{ 'cart.general.gift_note_add' | t }}`">
                  </BtnSecondary>
                  <Icon v-if="giftMessageDrawerOpen" class="mr-2" aria-label="close modal" name="close"  size="14px"></Icon>
                  <p
                    v-if="giftMessage != '' && !giftMessageDrawerOpen"
                    class="font-primary font-bold uppercase text-e12 tracking-wider text-white mr-3 underline cursor-pointer"
                    @click="giftMessageDrawerOpen = true"
                    v-html="`{{ 'cart.general.gift_note_edit_short' | t }}`">
                  </p>
                  <p
                    v-else-if="giftMessage != '' && giftMessageDrawerOpen"
                    class="font-primary font-bold uppercase text-e12 tracking-wider text-white mr-3 underline cursor-pointer"
                    @click="giftMessageDrawerOpen = false"
                    v-html="`{{ 'cart.general.gift_note_close' | t }}`">
                  </p>
                </div>
                <div class="w-full p-3 bg-gray-200 text-gray-600 italic text-megamenu_sub font-body" v-if="giftMessage != '' && !giftMessageDrawerOpen" v-html="giftMessage"></div>
              </div>
              <div v-if="isLoggedIn" class="w-1/2 flex justify-end items-start">
                <BtnAccordion
                  v-if="initialized && redemptionOptions.length > 0 && currentStore != 'eu'"
                  class="font-primary font-bold uppercase text-e16 underline tracking-widest text-blue-200 bfx-remove-element"
                  :active="pointsDrawerOpen"
                  :iconColor="'#3b30fe'"
                  @update:active="pointsDrawerOpen = !pointsDrawerOpen"
                  :text="`{{ 'cart.general.redeem_points' | t }}`" />
              </div>
              <div v-else class="w-1/2 flex justify-end items-start">
                <a
                  class="font-primary font-bold uppercase text-e16 underline tracking-widest text-blue-200 bfx-remove-element"
                  href="/account"> {{ state.language.login_redeem }}</a>
              </div>
            </div>
            <div class="text-0 flex flex-no-wrap items-start justify-between">
              <TransitionExpand>
                <CartGiftMessageEntry
                  class="px-e14 md:px-0 pb-e16 inline-block"
                  style="max-width: 49%;"
                  v-show="giftMessageDrawerOpen"
                  @click="giftMessageDrawerOpen = false"
                  :onSubmit="updateNote"
                  :message="giftMessage"
                  @update:message="v => giftMessage = v" />
              </TransitionExpand>
              <div v-if="!giftMessageDrawerOpen"></div>
              <TransitionExpand>
                <CartRewardsSelector
                  class="px-e14 md:px-0 pb-e16 inline-block w-1/2"
                  :class="[!giftMessageDrawerOpen ? '' : 'gift-open']"
                  style="max-width: 50%;"
                  v-show="pointsDrawerOpen && initialized && redemptionOptions.length > 0"
                  :onOptionSelect="selectOption"
                  :appliedOption="appliedOption"
                  :selectedOption="selectedOption"
                  :onApply="apply"
                  :redemptionOptions="redemptionOptions"
                  :pointBalance="[customerDetails ? customerDetails.pointsBalance : '']" />
              </TransitionExpand>
            </div>
            <GiftWithPurchaseSelector
              v-if="gwpEnabled && cart.item_count > 0"
              class="hidden md:block py-e20 px-e16 bg-gray-200 text-center mt-e16"
              :cart="cart"
              :lineItems="cart.items" />
          </div>
        </div> <!-- [END] cart desktop left -->
        <div class="cart__right align-top md:inline-block md:sticky md:pt-e64"> <!-- [START] cart desktop right -->
          <CartSubtotal
            class="leading-4 px-e14 pt-e16 md:px-0 md:pt-0"
            v-if="cart.item_count > 0"
            :subtotal="cart.total_price"
            :onCheckout="goToCheckout">
          </CartSubtotal>
          <div class="md:hidden">
            <div class="flex items-center justify-between px-e14 pb-e16 md:px-0">
              <template v-if="settings.cart_gift_message_enable">
                <button
                  v-if="!giftMessageDrawerOpen"
                  @click="mobileGiftMessageOpen"
                  class="font-primary font-bold uppercase text-center whitespace-no-wrap rounded-e2 bg-black text-white text-e12 tracking-widest px-3 md:px-5 py-3 min-w-0 leading-none bfx-remove-element"
                  :href="`{{ routes.cart_url }}`"
                  v-html="`{{ 'cart.general.gift_note_add' | t }}`"></button>
                <button
                  v-if="giftMessageDrawerOpen"
                  @click="giftMessageDrawerOpen = !giftMessageDrawerOpen"
                  class="cart__gift-message-button uppercase bg-black text-white font-primary font-bold text-e12 tracking-header min-w-1/2 \
                    pr-e20 pl-e26 h-e40 flex justify-between items-center focus:shadow-outline"
                  slot="link-bottom-left">
                  <span  class="font-bold" v-pre>{{ 'cart.general.gift_note_add' | t}}</span>
                  <Icon class="" aria-label="close modal" name="close" size="14px"></Icon>
                </button>
              </template>
              <BtnAccordion
                v-if="initialized && redemptionOptions.length > 0"
                class="font-primary font-bold uppercase text-e12 underline tracking-widest text-blue-200"
                :active="pointsDrawerOpen"
                :iconColor="'#3b30fe'"
                @update:active="mobilePointsOpen"
                :text="`{{ 'cart.general.redeem_points' | t }}`" />
              <a v-if="!isLoggedIn"
                  class="font-primary font-bold uppercase text-e12 underline tracking-widest text-blue-200"
                  href="/account"> {{ state.language.login_redeem }}</a>
            </div>
            <div class="w-full p-3 bg-gray-200 text-gray-600 italic text-megamenu_sub font-body" v-if="giftMessage != '' && !giftMessageDrawerOpen" v-html="giftMessage"></div>
              <TransitionExpand>
                <CartRewardsSelector
                  class="px-e14 md:px-0 pb-e16 bfx-remove-element"
                  v-if="pointsDrawerOpen && initialized && redemptionOptions.length > 0"
                  :onOptionSelect="selectOption"
                  :appliedOption="appliedOption"
                  :selectedOption="selectedOption"
                  :onApply="apply"
                  :redemptionOptions="redemptionOptions"
                  :pointBalance="customerDetails.pointsBalance" />
                <CartGiftMessageEntry
                  class="px-e14 md:px-0 pb-e16"
                  v-if="giftMessageDrawerOpen"
                  :onSubmit="updateNote"
                  :message="giftMessage"
                  @update:message="v => giftMessage = v" />
              </TransitionExpand>
          </div>
          <GiftWithPurchaseSelector
            v-if="gwpEnabled && cart.item_count > 0"
            class="md:hidden py-e20 px-e16 bg-gray-200 text-center my-e16"
            :cart="cart"
            :lineItems="cart.items" />
          <div class="px-e14 md:px-0">
            <transition name="fade">
              <CartDonation
                class="cart__donation w-full text-black px-e30 md:px-e12 py-e20 z-30 bg-gray-200 relative text"
                v-if="donationProduct && !donationComplete && settings.cart_donation_enable"
                :image="`{{ settings.cart_donation_image | img_url: 'master' }}`"
                :imageAlt="`{{ settings.cart_donation_image.alt }}`"
                :heading="`{{ settings.cart_donation_heading }}`"
                :subText="`{{ settings.cart_donation_subtext }}`"
                :onAddItem="addItem"
                :product="donationProduct" />
            </transition>
          </div>
        </div>  <!-- [END] cart desktop right -->
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

/** Shared components */
import CartHeader from '../cart-shared/CartHeader.vue';
import CartShippingProgress from '../cart-shared/CartShippingProgress.vue';
import CartEmpty from '../cart-shared/CartEmpty.vue';
import CartSubtotal from '../cart-shared/CartSubtotal.vue';
import SideCartSubtotal from '../cart-shared/SideCartSubtotal.vue';
import CartRewardsSelector from '../cart-shared/CartRewardsSelector.vue';
import CartGiftMessageEntry from '../cart-shared/CartGiftMessageEntry.vue';
import CartLogic from '../cart-shared/CartLogic';
import CartDonation from '../cart-shared/CartDonation.vue';
import CartDonationLogic from '../cart-shared/CartDonationLogic';
import CartRewardsLogic from '../cart-shared/CartRewardsLogic';

/** Cart specifc components */
import CartLineItem from './CartLineItem.vue';

/** Sidecart components */
import SideCartLineItem from '../side-cart/SideCartLineItem.vue';

/** Generic components */
import GiftWithPurchaseSelector from '../gift-with-purchase/GiftWithPurchaseSelector.vue';
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
    CartRewardsSelector,
    CartGiftMessageEntry,
    CartDonation,
    CartLineItem,
    SideCartLineItem,
    GiftWithPurchaseSelector,
    Badge,
    BtnSecondary,
    BtnAccordion,
    TransitionExpand
  }
})
export default class Cart extends mixins(CartLogic, CartDonationLogic, CartRewardsLogic) {
  @Prop() readonly cart!: ShopifyCart;

  settings = __BVA__.sidecart_settings;

  gwpEnabled = !!__BVA__.gwp_data;

  giftMessageDrawerOpen = false;

  pointsDrawerOpen = false;

  state = window.APPSTATE;

  gwpCartCount = this.cart.item_count;

  currentStore = this.state.current_store;

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
      if (this.cart.items[i].properties != null) {
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

  /** Check if the free shipping dummy product is in cart. See GWP. */
  get freeShippingProgressData () {
    let shouldForce = false;
    for(let i = 0; i < this.cart.items.length; i++){
      let found_smShipping = false;
      if (this.cart.items[i].properties != null) {
        for(let j = 0; j < this.cart.items[i].properties.length; j++){
          if(this.cart.items[i].properties[j].includes('_smshipping')){
            shouldForce = true;
          }
        }
      }
    }
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

  isCustomized (item: any) {
    if (item.properties) {
      return item.properties.some((elem: any) => elem[0] === 'customisationId')
    }
    return false;
  }
  
  mobileGiftMessageOpen() {
    this.pointsDrawerOpen = false;
    this.giftMessageDrawerOpen = !this.giftMessageDrawerOpen; 
  }

  mobilePointsOpen() {
    this.pointsDrawerOpen = !this.pointsDrawerOpen;
    this.giftMessageDrawerOpen = false; 
  }

  mounted (){
  }
}
</script> 

<style lang="scss" scoped>
  .cart {
    max-width: 1160px;
  }

  @screen md {
    .cart {
      @apply px-e16;
    }

    .cart__left {
      width: 69%;
      margin-right: 3%;
    }

    .cart__right {
      @apply top-80; // header height
      width: 28%;
    }
  }

  .cart__gift-message-button {
    margin-left: -14px;

    @screen md {
      margin-left: 0;
    }
  }
</style>

<style lang="scss">
  .cart__donation .async--secondary {
    @apply py-e8;
  }

  .cart__donation .async--secondary .donation__button-text {
    @apply text-e12;
  }

  .cart__donation .donation__image {
    @screen md {
      max-width: 80%;
      @apply mx-auto mb-e14;
    }
  }

  .cart .donation__close {
    display: none;
  }

  .cart .donation__heading {
    @apply text-e14 leading-4 tracking-wider;
  }

  .cart .gwp-offer {
    width: calc(50% - 4px);
  }

  @screen sm {
    .cart .gwp-offer {
      max-width: 208px;
      @apply mr-e8;
    }

    .cart .gwp-selector__offer-container {
      @apply justify-start;
    }

    .cart .gwp-selector__heading,
    .cart .gwp-selector__subheading {
      @apply text-left;
    }
  }
</style>
