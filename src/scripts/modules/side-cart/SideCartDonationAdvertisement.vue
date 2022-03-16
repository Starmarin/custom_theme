<template>
  <section class="bg-gray-200 p-e18 flex items-center justify-between">
    <div class="pr-e16">
      <h1 class="font-primary text-e12 leading-5 tracking-wider font-bold mb-e12 uppercase">{{heading}}</h1>
      <button 
        @click="onCtaClick" 
        class="link link--general font-primary font-bold text-red-500 text-e12 uppercase">
        {{atcText}}
      </button>
    </div>
    <img 
      :src="image" 
      :alt="imageAlt">
  </section>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue';

@Component
export default class CartDonationAdvertisement extends Vue {
 @Prop() readonly image!: string;

 @Prop() readonly imageAlt!: string;

 @Prop() readonly heading!: string;

 @Prop() readonly atcText!: string;

 @Prop() readonly onCtaClick!: () => void;
}
</script>

<style scoped lang="scss">
  img {
    max-width: 45%;
  }
</style>