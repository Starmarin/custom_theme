<template>
  <Cart :cart="state.cart" />
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import Cart from './Cart.vue';
import appState from '../../lib/appState';

@Component({ 
  components: { Cart },
  el: 'cart-root'
})
export default class CartRoot extends Vue {
  state = appState; 

}
</script> 