<template>
  <transition name="slide-in-right" v-bind="$props" @beforeEnter="beforeEnter">
    <slot></slot>
  </transition>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';

  @Component
  export default class MenuTransition extends Vue {
    @Prop() readonly target!: string;

    @Prop() readonly appear!: boolean;

    @Prop({ default: true }) readonly css!: boolean;

    @Prop() readonly mode!: string;

    @Prop() readonly type!: string;

    @Prop({ default: () => ({ enter: 300, leave: 300 }) })
    readonly duration!: number | string | Record<string, any>;

    beforeEnter() {
      const content = this.$el as HTMLElement;
      const targetEl = document.querySelector(this.target) as HTMLElement;

      if (!targetEl) {
        throw new Error('Target element not found');
      }

      // get the bottom of the target element
      const { height } = targetEl.getBoundingClientRect();

      if (content) {
        content.style.top = `${height}px`;
        content.style.height = `calc(100vh)`;
        content.style.minHeight = `calc(100vh)`;
      }
    }
  }
</script>
