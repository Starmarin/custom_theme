<template>
  <section class="flex flex-wrap items-end justify-start mt-0 sm:mt-12 sm:h-e600 relative" v-if="product.metafields.pdp.banner_desktop_banner !== null">
    <ProductProvider v-if="product.metafields.pdp.video_url_shopify !== null || product.metafields.pdp.video_url_vimeo !== null || product.metafields.pdp.video_url_youtube !== null">
      <div class="w-full h-full">
        <Icon @click="videoModal = true" name="play" size="90px" class="banner-video-btn bg-gray-700 hover:bg-btn-secondary_hover absolute  top-50p right-50p  transform translate-x-1/2 -translate-y-1/2 transition-all duration-200 text-white p-8 z-10 cursor-pointer"></Icon>
      </div>
    </ProductProvider>
    <img :alt="product.featured_image.alt" class="w-full h-e600 object-cover absolute hidden sm:block" :src="product.metafields.pdp.banner_desktop_banner" />
    <img :alt="product.featured_image.alt" class="w-full h-e500 object-cover block sm:hidden" :src="product.metafields.pdp.banner_mobile_banner" />
    <div class="w-full sm:w-1/3 ml-0 sm:ml-10 mb-0 sm:mb-10 p-4 sm:p-10 flex items-center sm:items-start flex-col z-10 md:mt-n600" :style="bannerBG">
      <p v-if="product.metafields.pdp.preheader !== null" class="font-primary font-bold text-md border-t border-b py-e2 leading-1 uppercase tracking-header" :style="preHeaderColor">{{ product.metafields.pdp.preheader }}</p>
      <p v-if="product.metafields.pdp.header !== null" class="font-primary font-bold uppercase text-e28 sm:text-e36 mt-4 leading-1 tracking-header" :style="bodyColor">{{ product.metafields.pdp.header }}</p>
      <p v-if="product.metafields.pdp.body_copy !== null" class="font-body font-normal text-center sm:text-left text-megamenu_sub sm:text-md mt-4" :style="bodyColor">{{ product.metafields.pdp.body_copy }}</p>
    </div>

    <button
      class="block bg-black opacity-50 fixed top-0 left-0 w-full h-full z-60"
      @click="videoModal = false"
      v-if="videoModal"
    ></button>
    <ProductProvider>
      <ModalWithOverlay :open="videoModal" @update:open="videoModal = false" class="block video-modal">
        <button
          class="absolute p-1 transition-colors duration-300 focus:shadow-outline z-80 -top-4 -right-4"
          @click="videoModal = false"
        > 
          <Icon name="modal-close" size="64px" class="bg-gray-200 text-black p-e18"></Icon>
        </button>
        <div class="flex justify-center" v-if="product.metafields.pdp.video_url_shopify !== null">
          <video class="w-full h-full" controls="controls" autoplay>
            <source :src="product.metafields.pdp.video_url_shopify" type="video/mp4" />
          </video>          
        </div>
        <div class="flex justify-center" v-else-if="product.metafields.pdp.video_url_youtube !== null">
          <iframe class="w-full" :src="product.metafields.pdp.video_url_youtube" height="600" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="flex justify-center" v-else-if="product.metafields.pdp.video_url_vimeo !== null">
          <iframe class="w-full" :src="product.metafields.pdp.video_url_vimeo" height="600" frameborder="0" allow="autoplay;" allowfullscreen></iframe>
        </div>
      </ModalWithOverlay>
    </ProductProvider> 


  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import VueMq from 'vue-mq';
import ModalWithOverlay from '../../components/ModalWithOverlay.vue';
import { moneyWithoutTrailingZeros } from '../../lib/util';
import { ProductProvider } from './ProductProvider';
import Icon from '../../components/Icon.vue'

Vue.use(VueMq, {
  breakpoints: { // default breakpoints - customize this
    sm: 650,
    md: 991,
    lg: 1440,
    xl: Infinity,
  },
  defaultBreakpoint: 'sm' // customize this for SSR
})

@Component({
  components: { Icon, ModalWithOverlay, ProductProvider },
  filters: {
    moneyWithoutTrailingZeros,
  },
})
export default class ProductBanner extends Vue {

  @Prop() readonly product!: ShopifyProduct;

  state = window.APPSTATE;

  videoModal = false;

  get preHeaderColor(){
    if(this.product.metafields.pdp.preheader_color !== ""){
      return 'color: ' + this.product.metafields.pdp.preheader_color + '; border-color: ' + this.product.metafields.pdp.preheader_color + ';';
    }
    return "color: #FFC71C; border-color: #FFC71C;";
  }

  get bodyColor(){
    if(this.product.metafields.pdp.header__body_copy_color !== ""){
      return 'color: ' + this.product.metafields.pdp.header__body_copy_color + ';';
    }
    return "color: #ffffff;";
  }

  get bannerBG(){
    if(this.product.metafields.pdp.text_container_background_colo !== ""){
      return 'background-color: ' + this.product.metafields.pdp.text_container_background_colo + ';';
    }
    return "background-color: #232828;";
  }


}
</script>

<style>
</style>