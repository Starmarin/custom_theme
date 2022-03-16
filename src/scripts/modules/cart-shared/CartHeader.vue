<template>
  <div class="flex items-center">
    <div class="bg-inherit color-inherit flex pl-e16 self-stretch items-center w-full">
      <Icon 
        name="cart" 
        role="presentation" 
        aria-hidden="true" />
      <span 
        v-if="itemCount > 0"
        class="h4 ml-e12 font-primary text-e24 font-bold leading-5 uppercase tracking-wider">{{ itemCount || 0 }}</span>
      <h1 
        class="font-primary text-e24 font-bold leading-5 uppercase tracking-wider"
        :class="{
          'ml-e16': itemCount === 0, 
          'ml-e20': itemCount > 0
        }"
        v-html="title">
      </h1>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Icon from '../../components/Icon.vue';

@Component({
  components: { Icon }
})
export default class CartHeader extends Vue {
  @Prop() readonly itemCount!: number;
  
  @Prop({ default: `{{ 'cart.general.title' | t }}`}) readonly title?: string;
}
</script>

<style>

</style>