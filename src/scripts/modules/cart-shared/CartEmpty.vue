<template>
  <section>
    <img 
      class="w-e84 mx-auto mb-e20"
      v-if="visibleCheck(`{{- settings.cart_empty_image -}}`)"
      :src="`{{- settings.cart_empty_image | img_url: '172x' -}}`"
      :alt="`{{- settings.cart_empty_image.alt -}}`">
    <h1 
      class="font-primary font-bold tracking-wider text-e24 leading-5 mb-e8 md:max-w-3/4 mx-auto" 
      v-if="visibleCheck(`{{- settings.cart_empty_message_header -}}`)"
      v-html="`{{- settings.cart_empty_message_header -}}`"></h1>
    <h2 
      class="mb-e30 font-body text-static" 
      v-if="visibleCheck(`{{- settings.cart_empty_message_subheader -}}`)"
      v-html="`{{- settings.cart_empty_message_subheader -}}`"></h2>
    <nav class="max-w-e490 mx-auto"
      :class="stackingClasses">
      <BtnPrimaryLink 
        class="uppercase"
        v-if="visibleCheck(`{{- settings.cart_empty_cta_1_url -}}`)"
        :href="`{{- settings.cart_empty_cta_1_url -}}`" 
        v-html="`{{- settings.cart_empty_cta_1_text -}}`" />
      <BtnSecondaryLink
        class="uppercase" 
        v-if="visibleCheck(`{{- settings.cart_empty_cta_2_url -}}`)"
        :href="`{{- settings.cart_empty_cta_2_url -}}`" 
        v-html="`{{- settings.cart_empty_cta_2_text -}}`" />
      <BtnPrimaryLink 
        class="uppercase"
        v-if="visibleCheck(`{{- settings.cart_empty_cta_3_url -}}`)"
        :href="`{{- settings.cart_empty_cta_3_url -}}`" 
        v-html="`{{- settings.cart_empty_cta_3_text -}}`" />
      <BtnTertiaryLink 
        class="uppercase" 
        v-if="visibleCheck(`{{- settings.cart_empty_cta_4_url -}}`)"
        :href="`{{- settings.cart_empty_cta_4_url -}}`" 
        v-html="`{{- settings.cart_empty_cta_4_text -}}`" />
    </nav>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import BtnPrimaryLink from '../../components/BtnPrimaryLink';
import BtnTertiaryLink from '../../components/BtnTertiaryLink';

@Component({components: { BtnPrimaryLink, BtnTertiaryLink }})
export default class CartEmpty extends Vue {
  @Prop({default: false}) readonly stackButtons!: boolean;

  get stackingClasses () {
    return {
      'space-y-e14 flex flex-col items-center': this.stackButtons,
      'space-y-0 space-x-2': !this.stackButtons,
    }
  }

  visibleCheck(value: string){
    let ctaUrl = value;
    if(ctaUrl.length > 0){
      return true;
    }
    return false;
  }

  mounted(){
  }
}
</script>

<style>

</style>