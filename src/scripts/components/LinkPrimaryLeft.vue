<template>
  <component :is="tag || 'a'" v-on="$listeners" class="link--primary--left">
    <slot name="icon"><Icon name="caret-left" :size="iconSize"/></slot>
    <slot></slot>
  </component>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import Icon from './Icon.vue';

  @Component({
    components: {
      Icon,
    },
    props: ['iconSize', 'tag'],
  })
  export default class LinkPrimary extends Vue {
    iconSize?: string;
  }
</script>
