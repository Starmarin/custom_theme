<template>
  <div v-if="isOOS" :style="OOSClass">{{ state.language.out_of_stock }}</div>
  <div v-else-if="isCustomized" :style="customizableClass">{{ state.language.customized }}</div>
  <div v-else-if="isCustomizable" :style="customizableClass">{{ state.language.customizable }}</div>
  <div v-else-if="isPromo" v-html="isPromo" :style="promoClass">{{ state.language.promo }}</div>
  <div v-else-if="isPreorder" :style="preorderClass">{{ state.language.preorder }}</div>
  <div v-else-if="isBackorder" :style="backorderClass">{{ state.language.backorder }}</div>
  <div v-else-if="onSale" :style="saleClass">{{ state.language.sale }}</div>
  <div v-else-if="isLimited" :style="limitedClass">{{ state.language.limited }}</div>
  <div v-else-if="isBestseller" :style="bestsellerClass">{{ state.language.bestseller }}</div>
  <div v-else-if="isNew" :style="newClass">{{ state.language.new }}</div>
  <div v-else-if="isYouth" :style="youthClass">{{ state.language.youth }}</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import BaseProduct from '../lib/BaseProduct/BaseProduct';

@Component
export default class Badge extends BaseProduct {
  @Prop() readonly isCustomized!: boolean;
}
</script>

<style>

</style>