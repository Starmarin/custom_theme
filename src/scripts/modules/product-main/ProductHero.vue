<template>
  <section class="flex flex-wrap h-e320 sm:h-e600" v-if="product.metafields.pdp.hero_desktop_banner !== null || product.metafields.pdp.rotating_hero === 1">
    <img  v-if="!product.metafields.pdp.rotating_hero" :alt="product.featured_image.alt" class="w-full h-e600 object-cover absolute hidden sm:block" :src="product.metafields.pdp.hero_desktop_banner" />
    <img v-if="!product.metafields.pdp.rotating_hero" :alt="product.featured_image.alt" class="w-full h-e320 object-cover absolute block sm:hidden" :src="product.metafields.pdp.hero_mobile_banner" />
    <div v-else-if="product.metafields.pdp.rotating_view" class="w-full sm:h-e600 h-e320 object-cover absolute">
      <div class="flex justify-center" v-html="product.metafields.pdp.rotating_view"></div>
    </div>
    <div class="w-full sm:w-1/2 h-e160 sm:h-full flex items-start sm:items-end justify-start sm:justify-end flex-col">
      <p class="font-primary font-bold text-28 leading-3 sm:text-hero uppercase relative w-2/3 sm:w-full pl-4 sm:pl-10 mt-4 sm:mt-0 sm:mb-6" :class="heroStyle">{{ product.title }}</p>
      <p class="font-body font-bold text-mobile_sub sm:text-hero_price relative w-full pl-4 sm:pl-10 sm:mb-10 bfx-price" :class="heroStyle">
        {{ product.selected_or_first_available_variant.price | moneyWithoutTrailingZeros }}
        <span class="font-body font-bold text-hero_price ml-2 opacity-90 line-through bfx-price bfx-original-price" :class="heroStyle" v-if="product.selected_or_first_available_variant.price < product.selected_or_first_available_variant.compare_at_price">{{ product.selected_or_first_available_variant.compare_at_price | moneyWithoutTrailingZeros }}</span>
      </p>
    </div>
    <div class="w-full sm:w-1/2 sm:h-full flex items-end sm:justify-end  justify-between md:flex-col px-4 sm:pr-10 pb-4 sm:pb-10">
      <button v-if="isVideo" @click="videoModal = true" class="relative sm:mb-e16">
        <Icon v-if="$mq === 'sm'" @click="videoModal = true" name="play-black" size="48px" class="banner-video-btn bg-gray-300 hover:bg-btn-secondary_hover transition-all duration-200 text-black p-e18 z-10"></Icon>
        <Icon v-else @click="videoModal = true" name="play-black" size="72px" class="banner-video-btn bg-gray-300 hover:bg-btn-secondary_hover transition-all duration-200 text-black p-e25
         z-10 cursor-pointer"></Icon>
      </button>
      <button tabindex="0" @click="a2cScroll" class="flex justify-center items-center cursor-pointer relative py-3 sm:py-5 px-7 sm:px-16 rounded-e2 font-primary font-bold text-megamenu_sub sm:text-xl tracking-header sm:tracking-huge uppercase transition-all duration-300 hover:bg-gray-100 border border-transparent focus:border-util-focus" :class="heroStyle">
        <Icon name="cart" size="28px" class="mr-3"></Icon>
        {{ state.language.add }}
      </button>
    </div>
    <ProductProvider>
      <ModalWithOverlay :open="videoModal" @update:open="videoModal = false" class="block video-modal">
        <button
          class="absolute p-1 transition-colors duration-300 focus:shadow-outline z-80 -top-4 -right-4"
          @click="videoModal = false"
        > 
          <Icon name="modal-close" size="64px" class="bg-gray-200 text-black p-e18"></Icon>
        </button>
        <div class="flex justify-center" v-if="product.metafields.pdp.hero_video_shopify !== null">
          <video class="w-full h-full" controls="controls" autoplay>
            <source :src="product.metafields.pdp.hero_video_shopify" type="video/mp4" />
          </video>          
        </div>
        <div class="flex justify-center" v-else-if="product.metafields.pdp.hero_video_youtube !== null">
          <iframe class="w-full" :src="product.metafields.pdp.hero_video_youtube" height="600" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="flex justify-center" v-else-if="product.metafields.pdp.hero_video_vimeo !== null">
          <iframe class="w-full" :src="product.metafields.pdp.hero_video_vimeo" height="600" frameborder="0" allow="autoplay;" allowfullscreen></iframe>
        </div>
      </ModalWithOverlay>
    </ProductProvider> 
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import AffirmPromo from '../../components/AffirmPromo.vue';
import { moneyWithoutTrailingZeros } from '../../lib/util';
import Icon from '../../components/Icon.vue';
import ModalWithOverlay from '../../components/ModalWithOverlay.vue'


@Component({
  components: { AffirmPromo, Icon, ModalWithOverlay },
  filters: {
    moneyWithoutTrailingZeros,
  },
})
export default class ProductHero extends Vue {

  @Prop() readonly product!: ShopifyProduct;

  state = window.APPSTATE;

  videoModal = false;

  get heroStyle() {
    if(this.product.metafields.pdp.text__cta_color !== ""){
      return this.product.metafields.pdp.text__cta_color;
    }
    return "Light";
  }

  get isVideo() {
    return this.product.metafields.pdp.hero_video_shopify || this.product.metafields.pdp.hero_video_youtube || this.product.metafields.pdp.hero_video_vimeo;
  }

  a2cScroll(){
    document.getElementById('a2c_btn')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  }

}
</script>

<style>
  p.Light {
    color: #ffffff;
  }
  p.Dark {
    color: #000000;
  }
  button.Light {
    background: #ffffff;
    color: #000000;
  }
  button.Dark {
    background: #000000;
    color: #ffffff;
  }
</style>