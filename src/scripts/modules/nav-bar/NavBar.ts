import './NavBar.scss';

/* eslint-disable */
import Vue from 'vue';
import Component, { mixins } from 'vue-class-component';
import LazyLoad from '../../components/LazyLoad';
import { Prop } from 'vue-property-decorator';
import Dropdown from '../../components/Dropdown.vue';
import BtnSecondary from '../../components/BtnSecondary';
import CartRewardsLogic from '../../modules/cart-shared/CartRewardsLogic';
import cart from '../../lib/cart';

const vClickOutside = require('v-click-outside');

export const NAME = 'NavBar';

function getProps(el: HTMLElement) {
  if (!el.dataset.props) return {};
  return JSON.parse(el.dataset.props);
}

const DRAWER_DEBOUNCE_TIMEOUT = 250;

export default function (el: HTMLElement) {
  @Component({
    name: NAME,
    el,
    propsData: getProps(el),
    components: {
      Dropdown,
      BtnSecondary,
      CartRewardsLogic,
      LazyLoad
    },
    directives: {
      clickOutside: vClickOutside.directive,
    }
  })
  class NavBar extends mixins(LazyLoad) {
    @Prop({default: 0}) readonly drawerCount!: number;
    @Prop({default: 0}) readonly primaryLocale!: string;
    @Prop({default: 'en'}) readonly currentLocale!: string;
    @Prop({default: 'usa'}) readonly activeCountry!: string;
    @Prop({ default: 0 }) readonly activeCurrency!: string;
    @Prop() readonly cart!: ShopifyCart;
  
    @Prop() mobilePromos!: any;

    customerDetails = null;
    scroll = false;
    desktopSearchOpen = true;
    mobSearchOpen = false;
    mobileMenuOpen = false;
    drawerStates = new Array(this.drawerCount).fill(false);
    mobileStates = new Array(this.drawerCount + 3).fill(false);
    closeTimerId = 0;
    desktopDropdownDrawerOpen = false;
    superstarTab = 'featured';
    openMobileNav = '';
    currentIndex = -1;
    state = window.APPSTATE;

    openAccountDropdown = false;
    openCountrySelect = false;
    openCountrySelectMobile = false;
    currentCountryImage = "https://bfx-objects.prd.borderfree.com/v1/dist/images/context-chooser/flags/US.gif"
    currentFlagImage = "https://bfx-objects.prd.borderfree.com/v1/dist/images/context-chooser/flags/UK.gif"
    showPromosMobile = false;
    desktopSelectedLanguage = this.primaryLocale;
    mobileSelectedLanguage = this.primaryLocale;
    currentCountry = this.activeCountry;
    currentCountryName = "USA";
    currentCurrency = this.activeCurrency;
    currentLanguage = this.currentLocale;
    mainLocale = this.primaryLocale;
    currencyCountry = this.currentLanguage;

    initialized = false;

    get mobileSearchOpen() {
      return this.mobileStates[this.mobileStates.length - 1];
    }

    set mobileSearchOpen(state: boolean) {
      // make sure other sub-menus are closed so they don't overlap
      const newMobileStates =  this.mobileStates.map(() => false);
      newMobileStates[this.mobileStates.length - 1] = state;
      this.mobileStates = newMobileStates;
    }

    toggleMobileContentByIndex(index: number) {
      this.$set(this.mobileStates, index, !this.mobileStates[index]);
      this.openCountrySelectMobile = false;
    }

    toggleMobileNav(nav: string) {
      if (nav == this.openMobileNav) {
        this.openMobileNav = '';
      } else {
        this.openMobileNav = nav;
      }
    }

    menuCloseCheck() {
      if (this.desktopDropdownDrawerOpen) {
        this.closeTimerId = window.setTimeout(() => {
          this.hideAllContent();
          this.desktopDropdownDrawerOpen = false;
        }, DRAWER_DEBOUNCE_TIMEOUT);
      }
    }

    toggleSideCart() {
      if (window.APPSTATE.current_store === 'eu') {
        this.state.cart_modal = !this.state.cart_modal;
      } else {
        let currentCountryElement: HTMLElement = document.querySelector('.current-country-image') as HTMLElement;
        let currentCountry = currentCountryElement.getAttribute('alt');
        if (document.location.pathname !== '/cart' && currentCountry === 'United States') {
          this.state.cart_modal = !this.state.cart_modal;
        } else {
          document.location.href = '/cart';
        }          
      }
    }

    openMobileSearch() {
      this.mobileMenuOpen = true;
      this.mobileSearchOpen = true;
    }

    closeMobileSearch() {
      this.mobileMenuOpen = false;
      this.mobileSearchOpen = false;
    }

    openMobileMenu () {
      this.mobileMenuOpen = true;
      this.mobileSearchOpen = false;
    }

    closeMobileMenu () {
      this.mobileMenuOpen = false;
      this.mobileSearchOpen = false;
    }

    toggleMobileMenu () {
      this.mobileMenuOpen = !this.mobileMenuOpen;
      this.mobileSearchOpen = false;
    }

    hideAllContent() {
      this.drawerStates = this.drawerStates.map(() => false);
    }

    showContentByIndex(index: number) {
      this.hideAllContent()
      this.$set(this.drawerStates, index, true);
      this.currentIndex = index;
      this.openCountrySelect = false;
      this.openAccountDropdown = false;
    }

    hideContentByIndex(index: number) {
      this.$set(this.drawerStates, index, false);
    }

    openDropdownDrawer () {
      window.clearTimeout(this.closeTimerId);
      this.desktopDropdownDrawerOpen = true;
    }
  
    closeDropdownDrawer () {
      this.closeTimerId = window.setTimeout(() => {
        this.hideAllContent();
        this.desktopDropdownDrawerOpen = false;
      }, DRAWER_DEBOUNCE_TIMEOUT);
    }

    hideAccountDropdown () {
      this.openAccountDropdown = false;
    }

    get countryFlag() {
      if (this.currentLocale === 'en') {
        return "https://bfx-objects.prd.borderfree.com/v1/dist/images/context-chooser/flags/GB.gif";
      }
      if (this.currentLocale === 'fr') {
        return "https://bfx-objects.prd.borderfree.com/v1/dist/images/context-chooser/flags/FR.gif";
      }
      if (this.currentLocale === 'es') {
        return "https://bfx-objects.prd.borderfree.com/v1/dist/images/context-chooser/flags/ES.gif";
      }
      if (this.currentLocale === 'de') {
        return "https://bfx-objects.prd.borderfree.com/v1/dist/images/context-chooser/flags/DE.gif";
      }
    }

    desktopSearchClick() {
      this.closeDropdownDrawer();
      this.hideAccountDropdown();
      let searchFocusElement: HTMLElement = document.querySelector('.search-desktop') as HTMLElement;
      window.setTimeout(function () {
        searchFocusElement.focus();        
      }, 250)
    }

    openSearchInput() {
      this.closeDropdownDrawer();
      this.hideAccountDropdown();
      this.desktopSearchOpen = true;
    }

    openCountrySelectorDesktop() {
      if(!document.querySelector('.bfx-cc-expanded') && window.APPSTATE.current_store !== 'eu') return;
      this.openCountrySelect = !this.openCountrySelect;
      let contextChooserElementDesktop: HTMLElement = document.querySelector('.bfx-cc-expanded') as HTMLElement;
      let refElementDesktop: HTMLElement = document.querySelector('.borderfree-wrapper-hook') as HTMLElement;
      let bfxButtonDesktop: HTMLElement = document.querySelector('#bfx-cc-btn') as HTMLElement;
      this.hideAccountDropdown();

      refElementDesktop.prepend(contextChooserElementDesktop);   
      // bfxButtonDesktop.setAttribute('value', window.APPSTATE.language.apply_now!);
    }

    openCountrySelectorMobile() {
      if(!document.querySelector('.bfx-cc-expanded') && window.APPSTATE.current_store !== 'eu') return;
      this.openCountrySelectMobile = !this.openCountrySelectMobile; 
      let contextChooserElementMobile: HTMLElement = document.querySelector('.bfx-cc-expanded') as HTMLElement;
      let refElementMobile: HTMLElement = document.querySelector('.borderfree-wrapper-hook-mobile') as HTMLElement;
      let bfxButtonMobile: HTMLElement = document.querySelector('#bfx-cc-btn') as HTMLElement;

      refElementMobile.prepend(contextChooserElementMobile);     
      // bfxButtonMobile.setAttribute('value', window.APPSTATE.language.apply_now!);
    }

    openDrawerAndShowContentByIndex (index: number) {
      this.showContentByIndex(index);
      this.openDropdownDrawer();
    }

    toggleShowContentByIndex(index: number) {
      if (index == this.currentIndex) {
        if (this.desktopDropdownDrawerOpen == true) {
          this.closeDropdownDrawer();
        } else {
          this.showContentByIndex(index);
          this.openDropdownDrawer();
        }
      } else {
        if (this.desktopDropdownDrawerOpen == true) {
          this.showContentByIndex(index);
        } else {
          this.showContentByIndex(index);
          this.openDropdownDrawer();          
        }
      }
    }

    closeDrawerAndHideContentByIndex (index: number) {
      // this.hideContentByIndex(index);
      this.closeDropdownDrawer();
    }

    toggleDrawerAndShowContentByIndex (index: number) {
      if(this.drawerStates[index]) {
        this.closeDrawerAndHideContentByIndex(index);
      } else {
        this.drawerStates = this.drawerStates.map(() => false);
        this.openDrawerAndShowContentByIndex(index);
      }
    }

    changeLanguageDesktop(currentPath: string) {
      this.changeLanguage(currentPath, this.desktopSelectedLanguage);
    }

    changeLanguageMobile(currentPath: string) {
      this.changeLanguage(currentPath, this.mobileSelectedLanguage);
    }

    changeLanguage(currentPath: string, selectedLanguage: string) {
      this.desktopSelectedLanguage = selectedLanguage;
      this.mobileSelectedLanguage = selectedLanguage;
      let existingCountryString = currentPath.substring(currentPath.length - 3, currentPath.length - 2);
      let languageToSwitch = selectedLanguage;
      let languageSlash = '/';
      if (existingCountryString == '/') {
        currentPath = currentPath.substring(0, currentPath.length - 3);
      }
      if (selectedLanguage == this.mainLocale) {
        languageToSwitch = '';
      }
      var url = document.location.origin + languageSlash + languageToSwitch + currentPath;
      window.location.href = url;      
    }

    onSwellInit (fn: () => any) {
      if(window.swellAPI && window.swellAPI.getCustomerDetails().referralCode) {
        fn();
        this.initialized = true;
      } else {
        setTimeout(this.onSwellInit.bind(this, fn), 1000);
      }
    }

    handleDebouncedScroll () {
      const currentWidth: boolean = window.innerWidth > 992 && window.innerWidth < 1440;
      if (!currentWidth) {
        if (window.scrollY > 1.5 && !this.desktopDropdownDrawerOpen) {
          this.scroll = true;
          if (window.innerWidth > 768) {
            this.desktopSearchOpen = false;
          }
        } else {
          this.scroll = false;
          if (window.innerWidth > 768) {
            this.desktopSearchOpen = true;
          }
        }
      }
    }

    mounted() {
      this.$nextTick(() => {
        this.mobilePromos = this.state.promos;
        this.onSwellInit(() => {
          this.customerDetails = window.swellAPI.getCustomerDetails();
        })
      });
      window.addEventListener('scroll', this.handleDebouncedScroll);
    }

    data() {
      return {
        countryOptions: [
          { label: 'United States', labelRight: '', value: 'usa' },
          { label: 'Europe', labelRight: '', value: 'eu' }
        ],
        currencyOptions: [
          { label: 'GBP', labelRight: '', value: 'GBP' },
          { label: 'EUR', labelRight: '', value: 'EUR' }
        ],
        languageOptions: [
          { label: 'English', labelRight: '', value: 'en' },
          { label: 'Spanish', labelRight: '', value: 'es' },
          { label: 'French', labelRight: '', value: 'fr' },
          { label: 'German', labelRight: '', value: 'de' }
        ],
      };      
    }
  
  }

  return new Vue(NavBar);
};
