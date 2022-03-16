<template>
  <Btn :buttonClasses="buttonClasses" :rippleClasses="['bg-gray-200']">
    <slot />
  </Btn>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import Btn from './Btn.vue';

  @Component({
    name: 'VariantBtn',
    props: {
      selected: {
        type: Boolean,
        default: false,
      },
    },
    components: {
      Btn,
    },
  })
  export default class VariantBtn extends Vue {
    selected?: boolean;

    get buttonClasses() {
      const baseClasses = this.selected ? ['selected', 'bg-gray-900', 'text-white'] : ['bg-gray-200', 'text-black'];
      return ['btn--variant', 'font-body', 'font-semibold', 'hover:text-white', 'hover:bg-gray-600', 'transition-all', ...baseClasses];
    }
  }
</script>
