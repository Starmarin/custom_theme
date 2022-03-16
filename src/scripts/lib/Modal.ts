import Vue from 'vue';
import Component from 'vue-class-component';
import { PropSync } from 'vue-property-decorator';

@Component
export default class Modal extends Vue {
  @PropSync('open', { default: false }) syncedOpen!: boolean; // https://github.com/kaorun343/vue-property-decorator#PropSync

  mounted() {
    window.addEventListener('keyup', this.closeModalKeyPress);
  }

  destroyed() {
    window.removeEventListener('keyup', this.closeModalKeyPress);
  }

  closeModalKeyPress(e: KeyboardEvent) {
    if (e.keyCode === 27) {
      this.syncedOpen = false;
    }
  }
}
