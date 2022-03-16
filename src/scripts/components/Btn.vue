/* eslint-disable */
<template>
  <component class="btn relative overflow-hidden inline-flex justify-center transition-colors ease-linear duration-200" :class="buttonClasses" :is="tag" v-on="$listeners" @mousedown="mousedown">
    <span class="btn__content relative z-20" :class="contentClasses">
      <slot></slot>
    </span>
    <span class="z-10 w-0 h-0 rounded-full ripple absolute inline-block" :class="[...rippleClasses, { 'animate-fade': rippling }]" :style="ripplePosition"></span>
  </component>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';

/**
 * TODO: Make ripple it's own wrapper component?
 */
@Component({
  name: 'Btn',
  props: {
    tag: {
      type: String,
      default: 'button',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    buttonClasses: {
      type: Array,
      default: () => [],
    },
    contentClasses: {
      type: Array,
      default: () => [],
    },
    rippleClasses: {
      type: Array,
      default: () => [],
    },
  },
})
export default class Btn extends Vue {
  tag?: string;

  buttonClasses?: string[];

  contentClasses?: string[];

  rippleClasses?: string[];

  rippling = false;

  ripplePosition = {
    bottom: '0px',
    right: '0px',
  };

  /** Set the ripple position to the clicked position */
  mousedown(event: MouseEvent) {
    const { x: buttonX, y: buttonY, width: buttonWidth, height: buttonHeight } = this.$el.getBoundingClientRect();
    const { x: mouseX, y: mouseY } = event;

    this.ripplePosition = {
      bottom: `${buttonY + buttonHeight - mouseY}px`,
      right: `${buttonX + buttonWidth - mouseX}px`,
    };

    this.rippling = true;

    window.setTimeout(() => {
      this.rippling = false;
    }, 300);
  }
}
</script>
