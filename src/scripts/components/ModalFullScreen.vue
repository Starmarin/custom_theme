<template>
  <FocusLock :disabled="!syncedOpen" v-scroll-lock="syncedOpen">
    <transition name="fade">
      <section
        v-show="syncedOpen"
        class="fixed w-full h-full top-0 left-0 bg-white flex items-center z-70 py-e60"
      >
        <div class="modal-content relative max-w-lg w-full mx-auto">
          <button
            class="fade-in-delay-1000 absolute left-0 top-0 p-e12 border border-solid border-gray-200 hover:bg-gray-200 transition-colors duration-300 rounded-full focus:shadow-outline"
            @click="syncedOpen = false"
            aria-label="close modal"
            v-if="showCloseButton"
          >
            <Icon name="close" size="18px"></Icon>
          </button>
          <slot></slot>
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
export default class ModalFullScreen extends Modal {
  @Prop() readonly showCloseButton!: boolean;
}
</script>

<style lang="scss" scoped>
.modal-content {
  max-height: calc(100vh - 120px);
}
</style>