<template>
  <nav>
    <div class="max-w-lg mx-auto relative w-full flex items-center justify-between"> 
      <ul class="hidden md:flex items-center whitespace-no-wrap">
        <li><a href="/" class="text-e12 link--nav text-black font-medium leading-normal">Home</a></li>
        <li class="h-e2 mt-e3 mx-e2 bg-black w-e32" v-if="collection"></li>
        <li v-if="collection">
          <a :href="collection.url" class="text-e12 link--nav text-black font-medium leading-normal">{{ collection.title }}</a>
        </li>
        <li class="h-e2 mt-e3 mx-e2 bg-black w-e32" v-if="product"></li>
        <li v-if="product">
          <a :href="product.url" class="text-e12 link--nav text-black font-medium leading-normal">{{ product.title }}</a>
        </li>
        <li class="h-e2 mt-e3 mx-e2 bg-black w-e32"></li>
        <li>
          <span class="text-e12 link--nav text-red-700 font-medium leading-normal">Cart</span>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import getProps from '../../lib/getProps';

@Component
export default class CardBreadcrumbs extends Vue {
  get product () {
    const product = window.sessionStorage.getItem('CART_BREADCRUMB_PRODUCT');
    if (product) {
      return JSON.parse(product);
    }
    return null;

  }

  get collection () {
    const collection = window.sessionStorage.getItem('CART_BREADCRUMB_COLLECTION');
    if (collection) {
      return JSON.parse(collection);
    }
    return null;

  }
}
</script>
