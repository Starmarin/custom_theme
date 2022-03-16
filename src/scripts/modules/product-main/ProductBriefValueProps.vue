<template>
  <ul class="md:px-0 flex-no-wrap justify-between">
    <li class="review inline-block text-0" v-html="product.yotpo.starsHtml"></li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class ProductBriefValueProps extends Vue {
  @Prop({ default: () => [] }) readonly briefValueProps!: string[][];

  @Prop() product!: ShopifyProduct;
}
</script>

<style>
.yotpo.bottomLine {
  display: inline-block;
}

.yotpo.bottomLine .standalone-bottomline .yotpo-bottomline .text-m {
  margin: 4px 0 0 4px !important;
  color: black !important;
  @apply block font-body font-semibold text-xs uppercase;
}

.yotpo-bottomline.pull-left.star-clickable {
  display: flex !important;
  width: 300px !important;
  flex-direction: row !important;
  align-items: center !important;
}

.yotpo-bottomline .rating-star {
  margin-right: 3px !important;
}
</style>