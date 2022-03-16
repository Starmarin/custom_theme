import Component from "vue-class-component";
import Vue from 'vue';
import VanillaLazyLoad from 'vanilla-lazyload';

@Component
export default class LazyLoad extends Vue {
  lazyloadInstance: null|any = null;
  
  mounted () {
    this.lazyloadInstance = new VanillaLazyLoad({
      container: this.$el as HTMLElement
    });
  }
}