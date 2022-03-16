<template>
  <button 
    class="btn" 
    :disabled="!!stateClass || disabled" 
    :class="stateClass" 
    v-on="$listeners">
    <span class="button__content">
      <slot></slot>
    </span>
  </button>
</template>

<script>
  import Icon from './Icon.vue'

  export default {
    name: 'AsyncButton',
    props: {
      promise: {
        type: Promise
      },
      disabled: {
        type: Boolean
      },
      autoReset: {
        type: Boolean,
      }
    },
    data() {
      return {
        stateClass: ''
      }
    },
    watch: {
      promise(n, o) {
        if(!(n instanceof Promise) || n === o) return;
        
        this.stateClass = 'button--state-loading';
        this.promise
          .then((r) => {
            this.stateClass = 'button--state-success';
            return r;
          })
          .catch((e) => {
            this.stateClass = 'button--state-error';
            return e;
          })
          .finally((r) => { // finally()
            if(this.autoReset) {
              window.setTimeout(() => {
                this.stateClass = '';
              }, 2100)
            }
            return r;
          });
      }
    }
  }
</script>

<style scoped lang="scss">
</style>