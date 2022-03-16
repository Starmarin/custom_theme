<template>
  <button 
    @click="syncedActiveState = syncedActiveState"
    v-bind="$listeners">
    <span 
      class="font-bold" 
      v-html="text"></span>
    <Icon 
      name="caret-down" 
      size="16px"
      class="inline-block origin-center transition-transform duration-300"
      :style="{'transform': `rotate(${syncedActiveState ? '180deg' : '0deg'}`, fill: iconColor}" />
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, PropSync } from 'vue-property-decorator';
import Icon from './Icon.vue';

@Component({
  components: {
    Icon
  }
})
export default class BtnAccordion extends Vue {
  @Prop() readonly text!: string;

  @Prop() readonly iconColor!: string;

  @PropSync('active') readonly syncedActiveState!: boolean;
}
</script>