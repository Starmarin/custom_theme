/* eslint-disable */
<template>
  <div
    class="dropdown"
    :class="{'is-open': isOpen, 'quantity-mode': quantityMode}"
    v-click-outside="hide"
  >
    <div class="relative">
      <button
        :class="{ 'disabled': !optionAvailable(selected) }"
        :aria-expanded="isOpen.toString()"
        class="selected w-full justify-between flex items-center tracking-wide focus:shadow-outline"
        aria-haspopup="listbox"
        :aria-label="state.language.quantity"
        v-bind:aria-labelledby="id"
        @click.prevent.stop="toggle"
        ref="toggleButton"
      >
        <span class="truncate font-primary font-bold" v-html="selectedLabel" />
        <div class="dropdown-arrow">
          <Icon class="standard-arrow" fillClass="text-black" :size="arrowSize" name="caret-right-large" />
          <Icon class="accent-arrow" fillClass="text-white" size="16px" name="caret-right-large" />
        </div>
      </button>
      <div v-if="isOpen" class="options" :class="isOpen" :tabindex.prop="isOpen ? 0 : -1" role="listbox" :id="id">
        <button
          :ref="option.value === selected ? 'currentOption': 'other'"
          role="option"
          class="option flex items-center w-full space-between tracking-wide"
          :aria-label="option.value"
          v-for="option in currentOptions"
          @click.prevent.stop="set(option.value)"
          :key="option.value"
          :class="{ 'disabled': !optionAvailable(option.value) }"
        >
          <span>{{ option.label }}</span>
          <span v-if="option.labelRight">{{ option.labelRight }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
import Vue from 'vue';
import Icon from './Icon.vue';
import { uniqueId } from '../lib/util';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const vClickOutside = require('v-click-outside');

interface DropdownOptions {
  label: string;
  labelRight?: string;
  value: string;
}

/**
 * TODO: Make ripple it's own wrapper component?
 */
@Component({
  name: 'Dropdown',
  components: { Icon },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    placeholder: {
      type: String,
      default: null,
    },
    quantityMode: {
      type: Boolean,
      default: false,
    },
    max: {
      type: Number,
      default: 1,
    },
    options: {
      type: Array,
      default: () => [],
    },
    buttonClasses: {
      type: Array,
      default: () => [],
    },
    selected: {
      type: [String, Number],
      default: null,
    },
    optionAvailable: {
      type: Function,
      default: () => () => false,
    },
    filterValues: {
      type: Array,
      default: () => [],
    },
    arrowSize: {
      type: String,
      default: '16px',
    }
  },
})
export default class Dropdown extends Vue {
  $refs!: {
    toggleButton: HTMLButtonElement;
    currentOption: Array<HTMLButtonElement>;
  };

  buttonClasses?: string[];

  state = window.APPSTATE;

  placeholder?: string;

  firstTime = true;

  options?: Array<DropdownOptions>;

  filterValues!: Array<string>;

  selected?: string;

  isOpen = false;

  quantityMode?: boolean;

  max?: number;

  id = uniqueId();

  @Watch('isOpen')
  handleOpen() {
    if (this.isOpen) {
      if (this.$refs.currentOption && this.$refs.currentOption.length) {
        setTimeout(() => {
          this.$refs.currentOption[0].focus();
          // Delay to allow the dropdown to render and then select current active by default
        }, 100);
      }
    } else {
      this.$refs.toggleButton.focus();
    }
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  hide() {
    this.isOpen = false;
  }

  show() {
    this.isOpen = true;
  }

  get selectedLabel() {
    if (!this.currentOptions) return null;
    const match = this.currentOptions.find(({ value }) => String(value) && String(value) === String(this.selected));
    const placeholder = this.placeholder ? this.placeholder : null;
    return match ? match.label : placeholder;
  }

  get currentOptions() {
    if (this.quantityMode) {
      const items = Array.from(Array(this.max).keys());
      return items.map((_, index) => ({ label: `${index + 1}`, value: `${index + 1}` }));
    }
    return this.options;
  }

  get currentFilterOptions () {
    if (this.currentOptions && this.filterValues.length) {
      return this.currentOptions.filter(({ value }: DropdownOptions) => !this.filterValues.includes(value))
    }

    return this.currentOptions;
  }

  set(option: string) {
    this.$emit('select', option);
    this.hide();
  }
}
</script>

<style lang="scss" scoped>
.selected.disabled,
.option.disabled {
  text-decoration: line-through;
}
</style>
