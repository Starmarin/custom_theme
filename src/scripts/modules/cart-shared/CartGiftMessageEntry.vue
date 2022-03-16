<template>
  <div>
    <textarea 
      class="w-full bg-gray-200 px-e12 py-e12 font-body text-e14 leading-9 text-gray-500 mb-e16"
      name="gift-message"
      v-model="syncedMessage"
      aria-labelledby="gift-note-label"
      cols="30" 
      rows="5"
      :placeholder="`{{ 'cart.general.gift_note_placeholder' | t }}`"
      ></textarea>
    <AsyncButton 
      :promise="submitPromise"
      class="async--secondary w-full"
      @click="submit">
        <span v-html="`{{ 'cart.general.gift_note_submit' | t }}`"></span>
    </AsyncButton>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component'
import { Prop, PropSync } from 'vue-property-decorator';
import AsyncButton from '../../components/AsyncButton.vue';

@Component({
  components: { AsyncButton }
})
export default class CartGiftMessageEntry extends Vue {
  @Prop() readonly onSubmit!: () => Promise<Error|string>;

  @PropSync('message') readonly syncedMessage!: string;

  submitPromise: null | Promise<any> = null;

  submit() {
    this.submitPromise = this.onSubmit()
  }
}
</script>

<style lang="scss" scoped>
  textarea::placeholder {
    @apply font-body text-e14 leading-9 text-gray-500;
  }
</style>