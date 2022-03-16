<template>
  <component :is="tag || 'a'" v-bind="$listeners" class="link">
    <slot></slot>
  </component>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    components: {
    },
    props: ['iconSize', 'tag'],
  })
  export default class LinkPrimary extends Vue {
  }
</script>
