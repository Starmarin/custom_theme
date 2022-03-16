<template>
  <nav class="breadcrumbs text-center bg-gray-breadcrumbs md:bg-white w-full px-e16 lg:px-0 flex items-center py-0 md:py-4">
    <div class="max-w-lg mx-auto relative w-full flex items-center justify-between">
      <ul class="hidden md:flex whitespace-no-wrap w-full">
        <li class="flex items-center ml-2 lg:ml-0">
          <a href="/" class="font-primary font-bold text-primary-500 uppercase underline hover:no-underline text-xs md:text-megamenu_sub tracking-tighter">{{ state.language.home }}</a>
        </li>
        <li class="flex items-center" v-if="collection">
          <p class="mx-1 text-black text-megamenu_sub">/</p>
          <a :href="'/collections/' + collection.handle" class="font-primary font-bold text-primary-500 uppercase underline hover:no-underline text-xs md:text-megamenu_sub tracking-tighter">{{ collection.title }}</a>
        </li>
        <li class="text-e14 text-red-500 font-medium leading-normal flex items-center">
          <p class="mx-1 text-black text-megamenu_sub">/</p>
          <p class="font-primary font-bold text-black uppercase text-xs md:text-megamenu_sub tracking-tighter">{{ title }}</p>
        </li>
      </ul>
      <ul class="flex md:hidden whitespace-no-wrap w-full my-2"> 
        <li class="flex items-center" v-if="collection">
          <a :href="'/collections/' + collection.handle" class="font-primary font-bold text-primary-500 uppercase underline text-xs md:text-megamenu_sub tracking-wider flex items-center">
            <Icon name="chevron-left" size="12px" class="mr-1"></Icon>
            {{ state.language.return }} {{ collection.title }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import debounce from 'lodash/debounce';
import { Prop, Watch } from 'vue-property-decorator';
import getProps from '../../lib/getProps';
import BtnPrimaryLink from '../../components/BtnPrimaryLink';
import scrollToAnchor from '../../lib/scrollToAnchor';
import Icon from '../../components/Icon.vue'

const tailwindConfig = require('../../../../tailwind.config.js');

export const INDICATOR_PADDING_MOBILE = 16 + 2; /* border width */
export const INDICATOR_PADDING_DESKTOP = 28 + 2; /* border width */
export const eventBus = new Vue();

function getActivePadding() {
  const mq = matchMedia(`(min-width: ${tailwindConfig.theme.screens.md})`);

  if (mq.matches) {
    return INDICATOR_PADDING_DESKTOP;
  }
  return INDICATOR_PADDING_MOBILE;
}

interface BreadcrumbLink {
  id: string;
  text: string;
}

@Component({
  components: {
    BtnPrimaryLink,
    Icon
  },
})
export default class PdpBreadcrumbs extends Vue {
  @Prop({ default: () => [] }) readonly links!: BreadcrumbLink[];

  @Prop() readonly collection!: ShopifyCollection;

  @Prop() readonly title!: string;

  indicatorLeft = 0;

  indicatorWidth = 0;

  ctaVisible = false;

  lastActiveLinkId = '';

  state = window.APPSTATE;

  supported = 'IntersectionObserver' in window;

  linkExistance: Dict = {};

  scrollToAnchor = scrollToAnchor;

  observer: IntersectionObserver | null = null;

  /** Adjust the active indicator width & height based on what section is visible on screen */
  intersectionCallback(entries: IntersectionObserverEntry[]) {
    // if two are intersecting, act on the one furthest down the page
    entries = entries.reverse();

    for (let i = 0; i < entries.length; i += 1) {
      const entry = entries[i];
      if (entry.isIntersecting) {
        const { id } = entry.target;

        this.activateLink(id);
        this.lastActiveLinkId = id; // save so we can use again when window is resized
        break;
      }
    }
  }

  activateLink(id: string) {
    if (!id || id === null) return;
    // cta should only show below the fold
    this.ctaVisible = window.document.documentElement.scrollTop > window.innerHeight;

    let indicatorTarget = document.querySelector(`.breadcrumbs li > a[href='#${id}']`) as HTMLElement;
    if(indicatorTarget != null){
      if (indicatorTarget.parentElement) {
        indicatorTarget = indicatorTarget.parentElement;
        const padding = getActivePadding();
        this.$nextTick(() => {
          // wait for hiding/showing cta to be done
          this.indicatorWidth = indicatorTarget.offsetWidth + padding * 2;
          this.indicatorLeft = indicatorTarget.offsetLeft - padding;
        });
      }
    }
  }

  initIntersectionObserver() {
    if (this.observer) this.observer.disconnect();

    const linksSelector = this.links.map((link) => `#${link.id}`).join(',');
    const elementsToObserve = document.querySelectorAll(linksSelector);
    const observerOptions = {
      root: null,
      threshold: 0.5,
    };
    this.observer = new IntersectionObserver(this.intersectionCallback, observerOptions);

    elementsToObserve.forEach((eto) => this.observer!.observe(eto));
  }

  initResizeWatcher() {
    window.addEventListener(
      'resize',
      debounce(() => {
        this.activateLink(this.lastActiveLinkId);
      }),
    );
  }

  // this should be run in $nextTick for deferred w/ settimeout
  // create a map of {id: boolean}
  checkLinkExistance() {
    this.linkExistance = this.links.reduce((acc, link) => {
      acc[link.id] = !!document.getElementById(link.id);
      return acc;
    }, {} as Dict);
  }

  init() {
    if (!this.supported) return;
    this.$nextTick(() => {
      this.checkLinkExistance();
      this.initIntersectionObserver();
      this.initResizeWatcher();
    });
  }

  mounted() {
    this.init();
    // allow async components to force an update
    eventBus.$on('update', this.init.bind(this));
  }

  @Watch('title')
  onTitleChange(n?: string, o?: string) {
    if (n !== o) {
      this.init();
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumbs-line-before + .breadcrumbs-line-before::before {
  content: '';
  display: inline-block;
  width: 32px;
  height: 3px;
  background: black;
  vertical-align: middle;
  margin: 0 4px;
}

.breadcrumbs-active-indicator {
  height: 29px;
  border-radius: 29px;
  top: calc(50% + 1px);
  transform: translateY(-50%) translateZ(0);
  transition: all 500ms ease;
  margin: 0 !important;
  width: 100%;
  max-width: 0;
  will-change: left;
  perspective: 1000px;

  @screen md {
    height: 39px;
    border-radius: 39px;
  }
}

.breadcrumbs-buy-now-container {
  min-width: 164px;
}

.breadcrumbs-buy-now {
  padding: 9px 32px;
  min-width: inherit;
}
</style>

