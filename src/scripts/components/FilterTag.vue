<template>
  <button
    v-on="$listeners"
    class="filter-tag font-body font-semibold inline-flex leading-none items-center justify-between /
     border hover:border-gray-700 bg-gray-200 text-sm mr-2 /
     mb-e10"
    :class="[active ? 'is-active border-gray-700' : 'border-transparent']"
  >
    <span class="body-md mr-2"><slot></slot></span>
    <Icon name="close" size="12px" />
  </button>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import Icon from './Icon.vue';

  @Component({
    props: {
      active: {
        type: Boolean,
        default: false,
      },
    },
    components: {
      Icon,
    },
  })
  export default class LinkPrimary extends Vue {
    active?: boolean;
  }
</script>
