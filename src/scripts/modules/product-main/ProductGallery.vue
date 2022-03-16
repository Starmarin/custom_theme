<template>
  <section class="pdp-gallery px-0 md:pr-e20 md:flex w-full md:w-p55" :class="[rotatingModal || imageModal || videoModal ? 'z-70' : 'z-0']">

    <div class="swiper-container pdp-swiper-container overflow-hidden block md:hidden" ref="mobileSwiper">
      <div class="swiper-wrapper">
        <template v-for="(media) in filteredImages">
          <div
            v-if="foundOption(media.alt)"
            class="swiper-slide h-e375 bg-gray-100 mb-2 border relative border-transparent transition-all duration-200 hidden-until-vue-loaded"
            :key="media.preview_image.src"
          >
            <img v-if="media.media_type === 'image'" :src="imageCrop(imageSize(media.preview_image.src, '800x800'), 'center')" :alt="altNull(media.alt)" class="w-full h-full ratio object-contain blend-darken" />
            <video v-else-if="media.media_type === 'video'" :controls="playVideo" :autoplay="playVideo" :muted="playVideo" class="w-full h-full">
              <source v-for="source in media.sources" :src="source.url" :type="source.mime_type" :key="source.url" />
            </video>
            <div class="w-full h-full" v-if="media.media_type === 'video'">
              <Icon @click="playVideo = true" :class="playVideo ? 'hidden' : ''" name="play" size="90px" class="banner-video-btn bg-gray-700 hover:bg-btn-secondary_hover absolute  top-50p right-50p  transform translate-x-1/2 -translate-y-1/2 transition-all duration-200 text-white p-8 z-10 cursor-pointer"></Icon>
            </div>
            <div v-else-if="media.media_type === 'external_video'" class="min-w-full min-h-full">
              <iframe v-for="(video, i) in product.external_video" height="375px" :key="i" class="w-full min-h-full" :src="video" frameborder="0" allow="accelerometer; autoplay; mute; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div v-if="media.media_type === 'image'" class="icons-mobile flex justify-end w-e130 min-w-e130 relative">
                <button tabindex="0" @click="imageModal = true" class="w-10 h-10 border border-transparent focus:border-util-focus">
                  <Icon name="expand" size="40px" class="bg-black hover:bg-btn-secondary_hover transition-all duration-200 text-white p-2 ml-1"></Icon>
                </button>
            </div>
          </div>
        </template>
        <div v-if="product.metafields.pdp.rotating_view && product.metafields.pdp.rotating_view_img" class="swiper-slide md:cursor-pointer bg-gray-100 mb-2 flex main-gallery-holder md:min-h-e750 md:max-h-e750 relative">
          <div class="flex justify-center min-w-full h-full" v-html="product.metafields.pdp.rotating_view"></div>
        </div>
      </div>
      <div class="pdp-swiper-scrollbar hidden mt-e40"></div>
      <div class="pdp-swiper-pagination h-4 flex justify-center mt-2 md:hidden"></div>

    </div>

    <div :class="[filteredImages.length > 5 ? 'overflow-y-scroll pr-e16' : '']" class="pdp-gallery__thumbs hidden md:block pb-2 mr-2 sticky top-150 h-e400" v-if="filteredImages.length > 0">
      <div class="flex flex-col">
        <template v-for="(media, index) in filteredImages">
          <div
            class="h-e80 w-e80 bg-gray-100 relative mb-2 border border-transparent transition-all duration-200"
            v-if="foundOption(media.alt)"
            :key="media.preview_image.src"
            :id="index"
            @click="thumbClick(index)"
            :class="[tooltipActiveColorClass, { 'pdp-gallery__thumb-active': activeIndex === index }]"
          >
            <img :src="imageCrop(imageSize(media.preview_image.src, '120x120'), 'center')" :alt="altSplit(media.alt)" class="pdp-gallery__thumb-img w-full ratio blend-darken" />
             <Icon v-if="media.media_type === 'video' || media.media_type === 'external_video'" name="play" size="40px"  class="absolute top-20 left-20 bg-black hover:bg-btn-secondary_hover transition-all duration-200 text-white p-3" style="--bg-opacity: 0.5;"></Icon>
          </div>
        </template>
        <div v-if="product.metafields.pdp.rotating_view && product.metafields.pdp.rotating_view_img"
            class="h-e80 w-e80 bg-gray-100 mb-2 border border-transparent transition-all duration-200 relative"
            :id="filteredImages.length"
            @click="thumbClick(filteredImages.length)"
            :class="[tooltipActiveColorClass, { 'pdp-gallery__thumb-active': activeIndex === filteredImages.length }]"
          >
            <img :src="product.metafields.pdp.rotating_view_img" class="pdp-gallery__thumb-img w-full ratio blend-darken" />
            <Icon name="rotate" size="40px" class="absolute top-20 left-20 bg-black hover:bg-btn-secondary_hover transition-all duration-200 text-white p-2 ml-1" style="--bg-opacity: 0.5;"></Icon>
          </div>
      </div>
    </div>

    <div class="pdp-gallery__main w-full hidden md:block">
      <div class="relative">
        <template v-for="(media, index) in filteredImages">
          <div v-if="foundOption(media.alt)" class="md:cursor-pointer bg-gray-100 mb-2 flex main-gallery-holder relative md:min-h-e750 md:max-h-e750" @mouseover="activeIndex = index" @click="setZoom($event, !zoomState)" @mouseleave="() => zoomState = false" :key="media.id">
            <Zoom
              v-if="media.media_type === 'image'"
              slot="image"
              ref="zoom"
              :id="'main-gallery_' + index"
              :img-normal-attrs="{ src: imageCrop(imageSize(media.src, '600x600'), 'center'), srcset: `${imageCrop(imageSize(media.src, '600x600'), 'center')} 600w,\
                ${imageCrop(imageSize(media.src, '1000x1000'), 'center')} 1000w`, alt: media.alt }"
              :img-zoom-attrs="{ src: imageCrop(imageSize(media.src, '600x600'), 'center'), srcset: `${imageCrop(imageSize(media.src, '600x600'), 'center')} 600w,\
                ${imageCrop(imageSize(media.src, '1000x1000'), 'center')} 1000w`, alt: media.alt }"
              :zooming="zoomState"
              :disabled="!zoomState"
              styleClass="ratio object-contain object-center blend-darken"
            />
            <video v-else-if="media.media_type === 'video'" :controls="playVideo" :autoplay="playVideo" :muted="playVideo" :id="'main-gallery_' + index" :ref="'video_' + index">
              <source v-for="source in media.sources" :src="source.url" :type="source.mime_type" :key="source.url" />
            </video>
            <div class="w-full h-full" v-if="media.media_type === 'video'">
              <Icon @click="playVideo = true" :class="playVideo ? 'hidden' : ''" name="play" size="90px" class="banner-video-btn bg-gray-700 hover:bg-btn-secondary_hover absolute  top-50p right-50p  transform translate-x-1/2 -translate-y-1/2 transition-all duration-200 text-white p-8 z-10 cursor-pointer"></Icon>
            </div>
            <div v-else-if="media.media_type === 'external_video'" class="min-w-full min-h-full">
              <iframe :id="'main-gallery_' + index" v-for="(video, i) in product.external_video" :key="i" class="w-full h-full" :src="video" frameborder="0" allow="accelerometer; autoplay; mute; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div class="pdp-gallery__preloader"></div>
            <div class="icons flex justify-end w-e130 min-w-e130 relative right-150 top-24">
              <ProductProvider>
                <button v-if="media.media_type === 'image'" tabindex="0" @click="zoomExpand($event)" class="w-10 h-10 border border-transparent focus:border-util-focus flex transition-opacity duration-200 focus:opacity-100">
                  <Icon name="expand" size="40px" class="bg-black hover:bg-btn-secondary_hover transition-all duration-200 text-white p-2 ml-1"></Icon>
                </button>
              </ProductProvider>
            </div>
          </div>
        </template>
        <div v-if="product.metafields.pdp.rotating_view && product.metafields.pdp.rotating_view_img" :id="'main-gallery_' + filteredImages.length" class="md:cursor-pointer bg-gray-100 mb-2 flex main-gallery-holder md:min-h-e750 md:max-h-e750 relative">
          <div class="flex justify-center min-w-full h-full" v-html="product.metafields.pdp.rotating_view"></div>
          <div class="icons flex justify-end w-e130 min-w-e130 relative right-150 top-24">
            <ProductProvider>
              <button tabindex="0" @click="rotatingModal = true" class="w-10 h-10 border border-transparent focus:border-util-focus flex transition-opacity duration-200 focus:opacity-100" v-if="product.metafields.pdp.rotating_view !== null">
                <Icon name="rotate" size="40px" class="bg-black hover:bg-btn-secondary_hover transition-all duration-200 text-white p-2 ml-1"></Icon>
              </button>
            </ProductProvider>
          </div>
        </div>
      </div>

      <ProductProvider>
        <ProductCompleteLook class="w-full"></ProductCompleteLook>
      </ProductProvider>

    </div>

    <button
      class="block bg-black opacity-50 fixed top-0 left-0 w-full h-full z-60"
      @click="imageModal = false"
      v-if="imageModal"
    ></button>

    <ProductProvider>
      <ModalFullScreen :open="rotatingModal" @update:open="rotatingModal = false" class="block z-90">
        <button
          class="fixed right-0 top-0 transition-colors duration-300 focus:shadow-outline z-80"
          :aria-label="state.language.close"
          @click="rotatingModal = false"
        >
          <Icon name="modal-close" size="64px" class="bg-gray-200 text-black p-e18"></Icon>
        </button>
        <p class="w-full text-center font-primary font-bold uppercase text-hero tracking-header relative top-80">{{ state.language.rotate_belt }}</p>
        <div class="flex justify-center" v-html="product.metafields.pdp.rotating_view"></div>
      </ModalFullScreen>
    </ProductProvider>

    <button
      class="block bg-black opacity-50 fixed top-0 left-0 w-full h-full z-60"
      @click="videoModal = false"
      v-if="videoModal"
    ></button>
    <ProductProvider>
      <ModalWithOverlay :open="videoModal" @update:open="videoModal = false" class="block video-modal">
        <button
          class="absolute p-1 right-0 top-0 transition-colors duration-300 focus:shadow-outline z-80"
          :aria-label="state.language.close"
          style="top: -4px; right: -4px;"
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
import Swiper, {Scrollbar, Navigation, Mousewheel, Pagination} from 'swiper';
import Icon from '../../components/Icon.vue';
import ModalFullScreen from '../../components/ModalFullScreen.vue';
import ModalWithOverlay from '../../components/ModalWithOverlay.vue';
import { imageCrop, imageSize } from '../../lib/util';
import { ProductProvider } from './ProductProvider';
import ProductCompleteLook from './ProductCompleteLook.vue';
import BaseProduct from '../../lib/BaseProduct/BaseProduct';

import Zoom from '../../components/Zoom.vue';

Swiper.use([Scrollbar, Navigation, Mousewheel, Pagination]);

const tailwindConfig = require('../../../../tailwind.config.js');
const { md } = require('../../lib/mediaQuery');

@Component({
  components: {
    Icon,
    ModalFullScreen,
    ProductProvider,
    ModalWithOverlay,
    ProductCompleteLook,
    Zoom
  },
})

export default class ProductGallery extends Vue {

  @Prop() readonly product!: ShopifyProduct;

  @Prop({ default: '' }) tooltipActiveColorClass!: string;

  @Prop() readonly selectedOptions!: string[];

  @Prop() readonly $mq!: string;

  filteredImagesArray?: Array<any>;

  variantOptions = this.selectedOptions;

  activeIndex = 0;

  imageModal = false;

  rotatingModal = false;

  videoModal = false;

  mobileSwiper?: Swiper;

  state = window.APPSTATE;

  zoomState = false;

  playVideo = false;

  thumbClick(selectedIndex: number) {
    this.activeIndex = selectedIndex;
    const anchorString = '#main-gallery_' + selectedIndex.toString();
    this.scrollToImage(selectedIndex, anchorString);
  }

  altNull(altText: string){
    if(altText !== null){
      return altText;
    }
    return this.product.title;
  }

  zoomExpand(event: any) {
    event.stopPropagation()
    setTimeout(() => {
      this.setZoom(event, !this.zoomState);
    }, 50);
  }

  zoomCenter(event: string) {
    this.zoomState = true;

    this.$nextTick(() => {
      const zoomContainer = this.$refs.zoom as any;
      if(zoomContainer) {
        zoomContainer.zoomCenter();
      }
    })
  }

  setZoom(event: string, state: boolean) {
    
    this.zoomState = state;
    if (this.$mq !== 'mobile') {
      this.$nextTick(() => {
        const zoomContainer = this.$refs.zoom as any;
        if(zoomContainer) {
          zoomContainer.move(event);
        }
      })
    }
  }

  get videoPresent(){
    if (this.product.metafields.pdp.video_url_shopify !== null){
      return true;
    }
    if (this.product.metafields.pdp.video_url_youtube !== null){
      return true;
    }
    if (this.product.metafields.pdp.video_url_vimeo !== null){
      return true;
    }
    return false;
  }

  get filteredImages(){
    this.filteredImagesArray = this.product.media;
    let filteredMedia = []
    const option_one = this.product.options[0];
    const value_one =  this.variantOptions[0];

    if(this.variantOptions.length === 1){
      filteredMedia = this.filteredImagesArray.filter(media => (media.alt?.includes("[" + option_one + ":" + value_one + "]") || !media.alt?.includes("[")));
    }else if(this.variantOptions.length === 2){
      const option_two = this.product.options[1];
      const value_two =  this.variantOptions[1];
      filteredMedia = this.filteredImagesArray.filter(media => (media.alt?.includes("[" + option_one + ":" + value_one + "]") || media.alt?.includes("[" + option_two + ":" + value_two + "]") || !media.alt?.includes("[")));
    }else if(this.variantOptions.length === 3){
      const option_two = this.product.options[1];
      const value_two =  this.variantOptions[1];
      const option_three = this.product.options[2];
      const value_three =  this.variantOptions[2];
      filteredMedia = this.filteredImagesArray.filter(media => (media.alt?.includes("[" + option_one + ":" + value_one + "]") || media.alt?.includes("[" + option_two + ":" + value_two + "]") || media.alt?.includes("[" + option_three + ":" + value_three + "]") || !media.alt?.includes("[")));
    }

    return filteredMedia;
  }

  foundOption(altText: string){
    if(altText == null){
      return true;
    }
    if(!altText.includes("[")){
      return true;
    }
    for(let i = 0; i < this.variantOptions.length; i++){
      const option = this.product.options[i];
      const value =  this.variantOptions[i];
      if(altText.includes("[" + option + ":" + value + "]")){
        return true;
      }
    }
    return false;
  }

  altSplit(altText: string){
    if(altText == null){
      return this.product.title;
    }
    if(altText.includes("|")){
      return altText.split("|")[1];
    }
    return altText;
  }

  scrollToImage(targetIndex: number, target: string) {
    let scrollPlus = 0;
    if(this.product.metafields.pdp.hero_desktop_banner){
      scrollPlus += 654;
    }
    const stickyHeader = document.querySelector('.sticky');
    const stickyHeaderHeight = stickyHeader ? stickyHeader.clientHeight : 0;
    scrollPlus += stickyHeaderHeight;

    const bottomPromo = document.querySelector('#shopify-section-nav--bottompromobar');
    const bottomPromoHeight = bottomPromo ? bottomPromo.clientHeight : 0;
    scrollPlus -= bottomPromoHeight;

    const targetElement = document.querySelector(target);
    const targetHeight = targetElement ? targetElement.clientHeight : 0;

    const scrollPosition = (targetIndex * (targetHeight + 8)) + scrollPlus - 25;
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth',
    });
  }

  imageSize(file: string, size: string) {
    return file ? file.replace(/\.(png|jpg|jpeg|gif|webp)/, `_${size}.$1`) : '';
  }

  imageCrop(file: string, position: string) {
    return file.replace(/\.(png|jpg|jpeg|gif|webp)/, `_crop_${position}.$1`);
  }

  initSwiper(){
    this.mobileSwiper = new Swiper(".pdp-swiper-container", {
      autoplay: false,
      scrollbar: {
        el: '.pdp-swiper-scrollbar',
        draggable: true,
      },
      mousewheel: {
        forceToAxis: true,
      },
      loop: true,
      pagination: {
        el: '.pdp-swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      slidesPerView: 'auto',
    });
    setTimeout(() => {
      this.mobileSwiper?.update();
    }, 500)
  }

  mounted() {
    this.$nextTick(() => {
      // this.filteredImagesArray = this.filteredImages();
      this.initSwiper();
    });
  }

}
</script>

<style lang="scss">
.BIS_trigger {
  display: none !important;
}
.pdp-gallery {
  &__button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 5;
    font-size: 0;
    cursor: pointer;
    appearance: auto;
  }

  &__thumbs {
    max-width: 100%;

    .swiper-slide {
      width: 80px;
      max-width: 80px;

      @screen md {
        width: 88px;
        max-width: 88px;
      }
    }

    .pdp-gallery__thumb-active {
      @apply border border-primary-500 relative;
    }
  }

  &__button-thumb {
    position: absolute;
    width: 20px;
    height: 20px;
    top: calc(50% - 4px);
    transform: translateY(-50%);
  }

  &__thumb-img {
    cursor: pointer;
  }

  &__preloader {
    border-color: var(--color-blue-500);
    border-top-color: transparent;
  }

  @screen md {
    &__main &__button {
      opacity: 0;
      transition: opacity 0.3s linear;
    }

    &:hover &__main &__button {
      opacity: 1;
    }
  }
}

.main-gallery-holder:hover .icons button {
  opacity: 1;
  cursor: pointer;
  z-index: 85;
}

.pdp-swiper-pagination {
  position: relative;
  z-index: 10;
}
.pdp-swiper-pagination .swiper-pagination-bullet {
  @apply h-e2 rounded-none w-6 bg-gray-400;
}
.pdp-swiper-pagination .swiper-pagination-bullet-active {
  @apply bg-primary-500;
}

.zoom-on-hover {
  cursor: zoom-in;
}

.zoom-on-hover .zoom {
  cursor: zoom-out;
}


</style>
