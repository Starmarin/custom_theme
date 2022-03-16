<template>
  <div class="accordion" :class="mainClasses">
    <button class="accordion__header" :class="headerClasses" @click.prevent="activate" :aria-expanded="active.toString()">
      <slot name="heading" :active="active"></slot>
      <span class="accordion__icon-container">
        <slot name="icons" :active="active"></slot>
      </span>
    </button>
    <transition-expand>
      <div
        class="accordion__content"
        v-show="active"
        ref="content"
        :class="contentContatinerClasses"
      >
        <slot name="content" :active="active"></slot>
      </div>
    </transition-expand>
  </div>
</template>

<script>
import { uniqueId } from '../lib/util';
import TransitionExpand from './TransitionExpand.vue';

export default {
  name: 'Accordion',
  components: { TransitionExpand },
  props: {
    headerClasses: Array,
    contentContatinerClasses: Array,
    selected: {
      type: Boolean,
      default: false,
    },
    id: {
      type: [String, Number],
      default: () => uniqueId(),
    },
  },
  data() {
    return {
      active: true,
      contentStyle: {},
      transition: 'none',
    };
  },
  computed: {
    mainClasses() {
      return [
        {
          'is-open': this.active,
        },
      ];
    },
  },
  mounted() {
    // NOTE: this has to be set to false after mount or scrollHeight will be 0
    this.active = this.selected;

    if (this.$parent.addAccordion) {
      this.$parent.addAccordion(this);
    }
  },
  beforeDestroy() {
    this.active = false;
    if (this.$parent.removeAccordion) {
      this.$parent.removeAccordion(this);
    }
  },
  methods: {
    activate() {
      if (this.$parent.activate && !this.active) {
        this.$parent.activate(this);
        this.$emit('active');
      } else {
        this.active = !this.active;
      }
    },
  },
};
</script>
