<template>
  <SideCartModal 
    :open="state.cart_modal" 
    @update:open="openState => state.cart_modal = openState" 
    :cart="state.cart" />
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import SideCartModal from './SideCartModal.vue';
import appState from '../../lib/appState';

@Component({
  el: 'side-cart-root',
  components: { SideCartModal }
})
export default class SideCartRoot extends Vue {
  state = appState;

  mounted(){
  }
}
</script>

<style>

</style>