<template>
  <aside v-scroll-lock="syncedOpen">
    <transition name="fade-overlay" :duration="300">
      <button 
        class="fixed top-0 left-0 bg-black w-screen min-h-screen h-screen z-60 opacity-20" 
        :aria-label="`{{ 'cart.label.close_sidecart' | t }}`" 
        aria-controls="sidecart" 
        :aria-expanded="syncedOpen.toString()"
        @click="syncedOpen = false" 
        v-if="syncedOpen"></button>
    </transition>
    <transition name="slide-in-sidecart" :duration="300">
      <keep-alive>
        <SideCart class="sidecart leading-0 fixed right-0 top-0 w-screen min-h-screen h-screen max-h-screen bg-white" 
          style="z-index: 999999"
          id="sidecart"
          :aria-label="`{{ 'cart.label.sidecart' | t }}`"
          aria-modal="true"
          role="dialog"
          :cart="cart" 
          @close="syncedOpen = false" 
          v-show="syncedOpen" />
      </keep-alive>
    </transition>
  </aside>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Modal from '../../lib/Modal';
import SideCart from './SideCart.vue';

@Component({
  components: { SideCart },
})
export default class SideCartModal extends Modal {
  @Prop() readonly cart!: any;

  mounted(){
  }
}
</script>

<style scoped lang="scss">
.sidecart {
  @screen sm {
    max-width: 480px;
  }
}

.slide-in-sidecart-enter-active,
.slide-in-sidecart-leave-active {
  right: 0;
  transition: right .3s ease-in-out;
}

.slide-in-sidecart-enter,
.slide-in-sidecart-leave-to {
  transition: right .3s ease-in-out;
  right: -101vw;
}

.fade-overlay-enter-active,
.fade-overlay-leave-active {
  opacity: .2;
  transition: opacity .3s;
}

.fade-overlay-enter,
.fade-overlay-leave-to {
  opacity: 0;
}
</style>