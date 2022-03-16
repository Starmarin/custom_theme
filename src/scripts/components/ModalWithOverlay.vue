<template>
  <FocusLock :disabled="!syncedOpen" v-scroll-lock="syncedOpen">
    <transition name="fade">
      <section v-show="syncedOpen" class="fixed w-full h-full pointer-events-none top-0 left-0 flex items-center z-60">
        <button
          class="hidden bg-black opacity-50 absolute top-0 left-0 w-full h-full z-60"
          @click="open = false"
          aria-label="close modal"
        ></button>
        <div class="modal-content w-pModal md:w-2/3 p-4 m-auto bg-white z-70 pointer-events-auto">
          <div class="max-w-lg mx-auto relative">
            <button
              class="fade-in-delay-1000 absolute right-0 top-0 p-1 transition-colors duration-300 focus:shadow-outline z-80"
              @click="open = false"
              aria-label="close modal"
              v-if="showCloseButton"
            >
              <Icon name="modal-close" size="18px"></Icon>
            </button>
            <slot v-if="syncedOpen"></slot>
          </div>
        </div>
      </section>
    </transition>
  </FocusLock>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import FocusLock from 'vue-focus-lock';
import { Prop } from 'vue-property-decorator';
import Icon from './Icon.vue';
import Modal from '../lib/Modal';

@Component({
  components: { FocusLock, Icon },
})
export default class ModalWithOverlay extends Modal {
  @Prop() readonly showCloseButton!: boolean;
}
</script>

<style lang="scss" scoped>
</style>