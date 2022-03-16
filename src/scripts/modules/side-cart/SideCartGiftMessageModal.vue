<template>
  <FocusLock>
    <div class="pt-e20 md:pt-0">
      <div class="flex justify-between items-center bg-gray-700 px-e16 py-e10 text-white">
        <strong 
          class="text-e16 font-primary tracking-header uppercase"
          id="gift-note-label" v-html="`{{ 'cart.general.gift_note_add' | t }}`"></strong>
        <button @click="onClose" class=" focus:shadow-outline">
          <Icon name="close" size="16px" />
        </button>
      </div>
      <CartGiftMessageEntry 
        v-bind="$props" 
        @update:message="m => $emit('update:message', m)"
        class="px-e16 pt-e24" />
    </div>
  </FocusLock>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import FocusLock from 'vue-focus-lock';
import Icon from '../../components/Icon.vue';
import AsyncButton from '../../components/AsyncButton.vue';
import CartGiftMessageEntry from '../cart-shared/CartGiftMessageEntry.vue';

@Component({
  components: { AsyncButton, CartGiftMessageEntry, Icon, FocusLock }
})
export default class SideCartGiftMessageModal extends Vue {
  @Prop() readonly onClose!: () => void;

  @Prop() readonly onSubmit!: () => Promise<Error|string>;

  @Prop() readonly message!: string;

  submitPromise: null | Promise<any> = null;

  submit() {
    this.submitPromise = this.onSubmit()
      .then(() => {
        setTimeout(this.onClose, 2000);
      })
  }
}
</script>
