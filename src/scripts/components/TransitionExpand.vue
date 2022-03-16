<template>
  <transition name="expand" @enter="enter" @after-enter="afterEnter" @leave="leave" v-bind="$props">
    <slot />
  </transition>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    appear: Boolean,
    css: { 
      type: Boolean, 
      default: true, 
    },
    mode: String,
    type: String,
    duration: { 
      type: [Number, String, Object], 
      default: () => ({enter: 300, leave: 300, })
    }
  },
  name: 'TransitionExpand',
  methods: {
    enter(element) {
      this.$nextTick(() => {
        const width = getComputedStyle(element).width;
  
        element.style.width = width;
        element.style.position = 'absolute';
        element.style.visibility = 'hidden';
        element.style.height = 'auto';
  
        const height = getComputedStyle(element).height;
  
        element.style.width = null;
        element.style.position = null;
        element.style.visibility = null;
        element.style.height = 0;
  
        // Force repaint to make sure the
        // animation is triggered correctly.
        getComputedStyle(element).height;
  
        // Trigger the animation.
        // We use `requestAnimationFrame` because we need
        // to make sure the browser has finished
        // painting after setting the `height`
        // to `0` in the line above.
        requestAnimationFrame(() => {
          element.style.height = height;
        });
      });
    },
    afterEnter(element) {
      element.style.height = 'auto';
    },
    leave(element) {
      const height = getComputedStyle(element).height;
      
      element.style.height = height;

      // Force repaint to make sure the
      // animation is triggered correctly.
      getComputedStyle(element).height;

      requestAnimationFrame(() => {
        element.style.height = 0;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  [name="expand"] {
    will-change: height;
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
    transition: height 300ms ease-in-out;
  }

  .expand-enter-active {
    transition: height 300ms ease-in-out;
    overflow: hidden;
  }

  .expand-leave-active {
    transition: height 300ms ease-in-out;
    overflow: hidden;
  }

  .expand-enter,
  .expand-leave-to {
    height: 0;
  }
</style>