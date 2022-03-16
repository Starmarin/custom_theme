<template>
  <section
    data-aos="fade"
    data-aos-anchor-placement="center-bottom"
    class="bg-white-100"
    v-if="product.metafields.accentuate.lifestyle_image && product.metafields.accentuate.lifestyle_image[0]"
  >
    <div class="max-w-screen-xl mx-auto relative overflow-hidden select-none">
      <video
        class="bg-img object-cover object-center max-w-full w-full"
        v-if="product.metafields.accentuate.lifestyle_image[0].media_type === 'video'"
        :src="product.metafields.accentuate.lifestyle_image[0].src"
        playsinline
        autoplay
        muted
        loop
      ></video>
      <img
        v-else
        aria-role="presentation"
        class="bg-img object-cover object-center max-w-full w-full"
        v-lazy="product.metafields.accentuate.lifestyle_image[0].src"
        :data-srcset="srcset"
        :alt="product.metafields.accentuate.lifestyle_image[0].alt"
      />
      <div
        class="absolute top-0 left-0 z-10 w-full flex items-center text-e28 md:text-e36 font-bold tracking-tight h-full"
      >
        <div
          class="content-container max-w-lg px-e20 md:px-e80 lg:px-0 flex justify-between mx-auto w-full"
        >
          <ul
            class="h-full text-white flex flex-col justify-between items-start border-l-2 border-solid border-white pl-e10 md:pl-e24"
            v-if="briefValueProps.length"
          >
            <li
              v-for="(briefProp, index) in briefValueProps"
              :key="briefProp[1]"
              data-aos="fade-right"
              :data-aos-delay="index * 100"
              :data-aos-offset="(3 - index) * 100"
              data-aos-anchor-placement="center-bottom"
            >
              <p>{{ briefProp[0] }}</p>
              <p class="text-e16 md:text-e20 font-medium tracking-tighter">{{ briefProp[1] }}</p>
            </li>
          </ul>
          <h1 class="self-end text-white">{{ title }}</h1>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import { Prop } from 'vue-property-decorator';

@Component
export default class ProductLifestyle extends Vue {
  @Prop() readonly product!: ShopifyProduct;

  @Prop({ default: () => [] }) readonly briefValueProps!: string[][];

  @Prop() readonly title!: string;

  get srcset() {
    if (!this.product.metafields.accentuate.lifestyle_image[0]) return '';

    return [
      ['w_1000', '1000w'],
      ['w_1200', '1200w'],
      ['w_1400', '1400w'],
      ['w_1600', '1600w'],
      ['w_1800', '1800w'],
      ['w_2000', '2000w'],
      ['w_2200', '2200w'],
      ['w_2400', '2400w'],
      ['w_2600', '2600w'],
    ]
      .map(([cloudinaryWidth, vpWidth]) => `${this.product.metafields.accentuate.lifestyle_image[0].cloudinary_src}${cloudinaryWidth} ${vpWidth}`)
      .join(',');
  }
}
</script>

<style lang="scss" scoped>
.bg-img {
  height: 400px;

  @screen md {
    height: 640px;
  }
}

.content-container {
  height: 63.5%;

  @screen md {
    height: 53.9%;
  }
}
</style>