/* eslint-disable */
<template>
  <div class="relative" :class="[accordion ? 'w-full': 'mr-e25']">
    <div
      v-cloak
      class="plp-sort-by relative"
      v-click-outside="() => isOpen = false"
      :class="[isOpen ? 'is-active' : '']"
    >
      <button
        class="py-e4 flex items-center capitalize"
        :class="[
          accordion
          ? 'text-h4 font-bold justify-between w-full'
          : `text-e18 font-normal px-e8 hover:text-red-700 ${isOpen ? 'text-red-700' : ''}`
        ]"
        @click="isOpen = !isOpen"
      >
        <span class="mr-2">{{ group }}
          <span
            v-if="currentActiveFilters.length"
          >({{currentActiveFilters.length}})
          </span>
        </span>
        <span
          class="block transform transition-transform /
          duration-300 ease-in-out mt-e2"
          :class="[isOpen ? '-rotate-180' : '']"
        >
          <icon name="chevron-down" :size="accordion ? '15px' : '10px'"></icon>
        </span>
      </button>
      <fade-transition>
        <ul
          :class="dropdownClasses"
          v-if="accordion ? true : isOpen"
        >
          <li
            v-for="facet in facets"
            :key="facet"
            class="md:whitespace-no-wrap py-e8 flex items-center"
          >
            <input
              :checked="isActiveFilter(facet)"
              type="checkbox"
              :id="facet"
              :value="facet"
              @change="toggleFacet(facet)"
              v-show="!isColorFilter"
            >
            <span
              v-if="isColorFilter"
              class="mr-2 inline-flex items-center"
              @click="toggleFacet(facet)"
            >
              <VariantSwatch :size="26" :active="isActiveFilter(facet)" :color="facet" />
            </span>
            <label class="body-md" :for="facet" v-html="renderLabel(facet)"></label>
          </li>
        </ul>
      </fade-transition>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Prop, Component, Vue,
} from 'vue-property-decorator';
import { FadeTransition } from 'vue2-transitions';
import { handleize, priceFilterRender } from '@/scripts/lib/util';
import { selectedFacetsIndex } from './util';
import Icon from '../../components/Icon.vue';
import VariantSwatch from '../../components/VariantSwatch.vue';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const vClickOutside = require('v-click-outside');

@Component({
  components: {
    Icon,
    VariantSwatch,
    FadeTransition,
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
})
export default class FilterDropdown extends Vue {
  @Prop() readonly group!: string;

  @Prop() readonly facets!: any;

  @Prop() readonly selected!: any;

  @Prop({ default: false }) readonly accordion!: boolean;

  isOpen = false;

  get isColorFilter() {
    return handleize(this.group) === 'color';
  }

  get isPriceFilter() {
    return handleize(this.group) === 'price';
  }

  get dropdownClasses() {
    if (this.accordion) {
      return [
        this.isOpen ? 'max-h-e1000' : 'max-h-0',
        'overflow-hidden',
        'pl-e10',
        this.isOpen ? 'pt-e10' : '',
        'transition-all ease-in-out duration-500',
      ];
    }

    return [
      'bg-white',
      'border-solid',
      'border',
      'border-gray-200',
      'shadow-card',
      'absolute',
      'z-30',
      'left-0',
      'top-100p',
      this.isColorFilter ? 'p-e20' : 'p-e24',
      'rounded-sm',
    ];
  }

  renderLabel(facet: string) {
    if (this.isPriceFilter) {
      return priceFilterRender(facet);
    }
    return facet;
  }

  toggleFacet(facet: string) {
    this.$emit('select', { name: this.group, value: facet });
  }

  get currentActiveFilters() {
    return this.selected.filter((c: any) => c.name === this.group);
  }

  isActiveFilter(facet: string) {
    return selectedFacetsIndex(this.selected, {
      name: this.group,
      value: facet,
    }) >= 0;
  }
}
</script>
