<template>
  <span class="block" :style="style">
    <slot></slot>
  </span>
</template>

<script lang="ts">
/**
 * @file this transition is designed as a loading state for a promise and not triggered by v-if or v-show.
 * - Trigger the transition by changing the prop "productPromise"
 * - The transition will last at least as long as prop "transitionDuration"
 */

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';

@Component
export default class TransitionPromiseFade extends Vue {
  @Prop() readonly productPromise!: Promise<Function>;

  @Prop({ default: 300 }) readonly transitionDuration!: number;

  timerId = -1;

  startTs = Date.now();

  resolved = false;

  transitionState = {
    out: false,
    in: false,
  };

  get style() {
    const { in: tIn, out: tOut } = this.transitionState;
    if (!tIn && tOut) {
      return {
        opacity: 0.1,
        transition: `opacity ${this.transitionDuration}ms ease`,
      };
    }
    return {
      opacity: 1,
      transition: `opacity ${this.transitionDuration}ms ease`,
    };
  }

  handleTransition(promise: Promise<Function>) {
    if (this.resolved && Date.now() > this.startTs + this.transitionDuration) {
      this.transitionState.in = true;
      this.transitionState.out = false;
      this.resolved = false;
    }
  }

  promiseHandler() {
    this.resolved = true;
  }

  @Watch('productPromise')
  onPromiseChange(newValue: undefined | Promise<Function>, oldValue: undefined | Promise<Function>) {
    if (newValue && newValue !== oldValue && newValue instanceof Promise) {
      clearTimeout(this.timerId);
      this.startTs = Date.now();
      this.resolved = false;
      this.timerId = setInterval(this.handleTransition, 50);
      this.transitionState.in = false;
      this.transitionState.out = true;
      newValue.then(this.promiseHandler, this.promiseHandler);
    }
  }
}
</script>