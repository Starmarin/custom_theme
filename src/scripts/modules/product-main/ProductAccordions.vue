<template>
  <article class="pdp-specs px-e12 py-e40 lg:px-e0 md:py-e64 max-w-lg mx-auto font-0" data-aos="fade" v-if="showSection">
    <AccordionGroup>
      <Accordion v-if="!compatibilityTabsError && completeCompatibityTabs.length > 0" class="border-t-2 border-b-2 border-black border-solid" :header-classes="['flex', 'justify-between', 'items-center', 'w-full', 'py-e16', 'md:py-e32', 'md:pr-e72']">
        <p slot="heading" class="text-e20 md:text-e28 font-bold tracking-tight">Product Compatibility</p>
        <template slot="icons">
          <Icon name="minus" :size="iconSize"></Icon>
          <Icon class="accordion-minus" name="minus" :size="iconSize"></Icon>
        </template>
        <div slot="content" class="pt-e12 pb-e32 md:pb-e40">
          <ul class="space-x-e24 text-e18 md:text-e20 tracking-tighter font-semibold mb-e8">
            <li class="inline-block pdp-specs__tab opacity-50" :class="{ 'active opacity-100': activeTabCompatibility === tab }" v-for="tab in completeCompatibityTabs" :key="tab.tabName">
              <button class="capitalize font-semibold" @click="activeTabCompatibility = tab">{{ tab.tabName }}</button>
            </li>
          </ul>
          <div class="md:flex md:justify-between md:items-start space-y-e24 md:space-y-0">
            <div v-for="tab in completeCompatibityTabs" :key="tab.tabName" class="flex space-x-e10 md:space-x-e16 flex-wrap">
              <figure v-for="prod of tab.products" :key="prod.title" v-show="tab === activeTabCompatibility" class="w-1/2 md:w-1/3 lg:w-1/5 pt-e16">
                <img v-if="prod && prod.images && prod.images[0]" :src="prod.images[0].src" :alt="prod.title" class="max-w-full" />
                <figcaption class="text-e18 tracking-tighter font-semibold mt-e16">{{ prod.title }}</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </Accordion>
      <Accordion v-if="product.metafields.accentuate.size_fit_image || copies.length" class="border-t-2 border-b-2 border-black border-solid" :header-classes="['flex', 'justify-between', 'items-center', 'w-full', 'py-e16', 'md:py-e32', 'md:pr-e72']">
        <p slot="heading" class="text-e20 md:text-e28 font-bold tracking-tight">Size and Fit</p>
        <template slot="icons">
          <Icon name="minus" :size="iconSize"></Icon>
          <Icon class="accordion-minus" name="minus" :size="iconSize"></Icon>
        </template>
        <div slot="content" class="pt-e12 pb-e32 md:pb-e40">
          <img class="mb-e40" v-if="product.metafields.accentuate.size_fit_image && product.metafields.accentuate.size_fit_image[0]" :src="product.metafields.accentuate.size_fit_image[0].src" :alt="product.metafields.accentuate.size_fit_image[0].alt" />
          <div v-if="copies.length" class="md:flex md:justify-between md:items-start space-y-e24 md:space-y-0">
            <div v-for="copy in copies" :key="copy.sizeFitHeading" class="md:w-5/12">
              <p class="text-e16 md:text-e20 tracking-tighter mb-e14 font-semibold">{{ copy.sizeFitHeading }}</p>
              <div class="body-md" v-html="copy.sizeFitBody"></div>
            </div>
          </div>
        </div>
      </Accordion>
      <Accordion class="border-t-2 border-b-2 border-black border-solid" :header-classes="['flex', 'justify-between', 'items-center', 'w-full', 'py-e16', 'md:py-e32', 'md:pr-e72']" v-if="techSpecs && techSpecs.length > 0">
        <p slot="heading" class="text-e20 md:text-e28 font-bold tracking-tight">Technical Specifications</p>
        <template slot="icons">
          <Icon name="minus" :size="iconSize"></Icon>
          <Icon class="accordion-minus" name="minus" :size="iconSize"></Icon>
        </template>
        <div slot="content" class="pt-e12 pb-e40 md:pb-e40">
          <ul class="space-x-e24 text-e18 md:text-e20 tracking-tighter font-semibold">
            <li class="inline-block pdp-specs__tab opacity-50" :class="{ 'active opacity-100': activeTabTech === tab }" v-for="tab in techSpecsTabs" :key="tab">
              <button class="capitalize font-semibold" @click="activeTabTech = tab">{{ tab }}</button>
            </li>
          </ul>
          <div v-for="spec in techSpecs" :key="spec.techSpecsCategory">
            <div class="my-e24 bg-white-100 grid pdp-specs__grid px-e12 py-e32 md:px-0 md:py-e56 text-center" v-if="spec.techSpecsCategory.toLowerCase() === activeTabTech" v-html="spec.techSpecsContent"></div>
          </div>
        </div>
      </Accordion>
      <Accordion v-if="faqs.length > 0" class="border-t-2 border-b-2 border-black border-solid" :header-classes="['flex', 'justify-between', 'items-center', 'w-full', 'py-e16', 'md:py-e32', 'md:pr-e72']">
        <p slot="heading" class="text-e20 md:text-e28 font-bold tracking-tight">Product FAQ</p>
        <template slot="icons">
          <Icon name="minus" :size="iconSize"></Icon>
          <Icon class="accordion-minus" name="minus" :size="iconSize"></Icon>
        </template>
        <div slot="content" class="pt-e12 px-e12 pb-e50 md:pb-e60 md:px-e102">
          <div class="pdp-specs__faq" v-for="(faq, index) in faqs" :key="'faq' + index">
            <p class="font-semibold text-e18 tracking-tighter">{{ faq.faqQuestion }}</p>
            <div class="wysiwyg mt-e12" v-html="faq.faqAnswer"></div>
          </div>
        </div>
      </Accordion>
    </AccordionGroup>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import uniq from 'lodash/uniq';
import lowerCase from 'lodash/lowerCase';
import find from 'lodash/find';
import cloneDeep from 'lodash/cloneDeep';
import pick from 'lodash/pick';
import formatRepeatable from '@/scripts/lib/formatRepeatables';
import AccordionGroup from '../../components/AccordionGroup.vue';
import Accordion from '../../components/Accordion.vue';
import Icon from '../../components/Icon.vue';

interface CompleteBVACompatibleProductsTab extends BVACompatibleProductsTab {
  products: any[];
}

/**
 * @summary Take a list of product handles nested inside "tab" objects and get the image and title for each of them.
 *
 * There are 3 tabs in the design, each with potentially 8 products. That's 24 products
 * which is over the limit of 20 products that can be accessed via liquid "all_products"
 * so we have to use /products.json
 */
function getCompatibleProductTabs(tabs: BVACompatibleProductsTab[]): Promise<CompleteBVACompatibleProductsTab[]> {
  const completedTabs = cloneDeep(tabs) as CompleteBVACompatibleProductsTab[];
  return fetch('/products.json?limit=999')
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error('/products.json request failed. Hiding compatible products section.');
    })
    .then(({ products }) => {
      // TODO below is very inefficient but no time
      completedTabs.forEach((tab) => {
        tab.products = [];
        tab.compatibleProducts.split('|').forEach((handle) => {
          const product = find(products, { handle });
          tab.products.push(pick(product, ['images[0]', 'title']));
        });
      });
      return completedTabs;
    });
}

const { md } = require('../../lib/mediaQuery');

const sizeMap = new Map([
  [false, '24px'],
  [true, '40px'],
]);

@Component({
  components: {
    AccordionGroup,
    Accordion,
    Icon,
  },
})
export default class ProductAccordions extends Vue {
  @Prop() readonly product!: ShopifyProduct;

  @Prop({ default: () => [] }) readonly faqs!: BVAFAQ[];

  // these dont have product data yet, which we need. @see mounted hook
  @Prop({ default: () => [] }) readonly compatibilityTabs!: BVACompatibleProductsTab[];

  iconSize = sizeMap.get(md.matches) as string;

  activeTabCompatibility = this.compatibilityTabs[0];

  activeTabTech = this.techSpecsTabs[0];

  // these will have product data
  completeCompatibityTabs: CompleteBVACompatibleProductsTab[] = [];

  compatibilityTabsError = false;

  mounted() {
    md.addEventListener('change', () => {
      this.iconSize = sizeMap.get(md.matches) as string;
    });

    getCompatibleProductTabs(this.compatibilityTabs)
      .then((completeTabs) => {
        this.activeTabCompatibility = completeTabs[0];
        this.completeCompatibityTabs = completeTabs;
      })
      .catch((e) => {
        this.compatibilityTabsError = false;
        console.error(e);
      });
  }

  // show the section if we have content for any of the sections
  get showSection() {
    return (this.faqs && this.faqs.length > 0) || (this.product.metafields.accentuate.size_fit_image && this.product.metafields.accentuate.size_fit_image[0]) || this.copies.length || (this.techSpecs && this.techSpecs.length) || this.completeCompatibityTabs.length > 0;
  }

  get copies() {
    return formatRepeatable(['size_fit_heading', 'size_fit_body'], this.product.metafields.accentuate);
  }

  get techSpecsTabs() {
    return uniq(this.techSpecs.map((spec) => spec.techSpecsCategory.toLowerCase()));
  }

  get techSpecs(): Dict[] {
    return formatRepeatable(['tech_specs_content', 'tech_specs_category'], this.product.metafields.accentuate);
  }
}
</script>

<style lang="scss">
.pdp-specs {
  .accordion + .accordion {
    border-top: none;
  }

  .pdp-specs__tab {
    position: relative;

    &::after {
      content: '';
      opacity: 0;
      transition: opacity 300ms ease;
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      background: currentColor;
      height: 2px;
      width: 100%;
    }

    &.active {
      @apply text-red-700;

      &::after {
        opacity: 1;
      }
    }
  }

  .pdp-specs__grid {
    grid-template-columns: 50% 50%;
    column-gap: 8px;
    row-gap: 24px;

    @screen sm {
      grid-template-columns: 33% 33% 33%;
    }

    @screen md {
      grid-template-columns: 25% 25% 25% 25%;
      row-gap: 58px;
    }

    & > * {
      @apply text-center px-e8;
    }

    & > * > * {
      @apply text-e16 font-semibold tracking-tighter mb-e8;

      @screen md {
        @apply text-e18;
      }
    }

    & > * > * + * {
      color: #313131;
      display: block;
      @apply text-e16 tracking-tighter font-normal;
    }
  }

  .pdp-specs__faq + .pdp-specs__faq {
    border-top: 2px solid var(--color-gray-300);
    margin-top: 40px;
    padding-top: 40px;
  }
}
</style>