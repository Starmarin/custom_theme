<template>
  <button
    v-on="$listeners"
    :aria-label="color"
    :style="sizeStyle"
    class="variant-swatch space-x-1 relative inline-flex \ w-10 h-10 transition-all duration-300 border-2 \ border-solid hover:border-gray-700"
    :class="[
      active ? 'is-active border-gray-700' : 'border-gray-200',
    ]"
  >
    <span
      class="absolute inset-5p"
      :data-swatch-color="color ? handleize(color) : color"
      :style="swatchImage"
    />
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { handleize } from '@/scripts/lib/util';
import Icon from './Icon.vue';

@Component({
  components: {
    Icon,
  },
  methods: {
    handleize,
  },
  props: {
    size: {
      type: Number
    },
    active: {
      type: Boolean,
      default: false,
    },
    background: {
      type: String,
      default: null,
    },
    option: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      default: null,
    },
  },
})
export default class LinkPrimary extends Vue {
  active?: boolean;

  background?: string;

  color?: string;

  // option?: string;
  @Prop({ default: 'color' }) option?: string;

  size?: number;

  get sizeStyle() {
    if(!this.size) return {};
    return {
      width: `${this.size}px`,
      height: `${this.size}px`
    }
  }

  get swatchImage(){
    if(this.option === undefined){
      this.option = 'color';
    }
    return "background-image: url('https://cdn.shopify.com/s/files/1/0070/5698/2143/files/" + handleize(this.option) + "-" + handleize(this.color)  + ".png')";
  }

  mounted(){
  }
}
</script>

<style lang="scss">
.variant-swatch::after {
  content: '';
  width: 100%;
  height: 1px;
  background: black;
  position: absolute;
  top: 50%;
  left: 0;
  transform: rotate(-45deg);
  opacity: 0;
  transition: opacity 300ms ease;
}

.variant-swatch.disabled,
.variant-swatch[disabled] {
  > span {
    opacity: 0.5;
  }

  &::after {
    opacity: 1;
  }

  pointer-events: none;
}
</style>
