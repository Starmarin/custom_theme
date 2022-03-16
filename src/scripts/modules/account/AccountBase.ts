import './account.scss';

import { Vue, Component } from 'vue-property-decorator';
import LinkPrimary from '../../components/LinkPrimary.vue';
import Dropdown from '../../components/Dropdown.vue';
import LinkPrimaryLeft from '../../components/LinkPrimaryLeft.vue';
import AccountActivateForm from './account-activate-form';
import AccountAddressItem from './account-address-item';
import AccountAddress from './account-address';
import AccountForms from './account-forms';
import AccountLoginForm from './account-login-form';
import AccountNewAddress from './account-new-address';
import AccountRecoverForm from './account-recover-form';
import AccountRegisterForm from './account-register-form';
import AccountResetForm from './account-reset-form';
import BtnPrimary from '../../components/BtnPrimary';

Vue.component('AccountActivateForm', AccountActivateForm);
Vue.component('AccountAddressItem', AccountAddressItem);
Vue.component('AccountAddress', AccountAddress);
Vue.component('AccountForms', AccountForms);
Vue.component('AccountLoginForm', AccountLoginForm);
Vue.component('AccountNewAddress', AccountNewAddress);
Vue.component('AccountRecoverForm', AccountRecoverForm);
Vue.component('AccountRegisterForm', AccountRegisterForm);
Vue.component('AccountResetForm', AccountResetForm);
Vue.component('LinkPrimaryLeft', LinkPrimaryLeft);

export const NAME = 'AccountBase';
export default function(el: HTMLElement) {
  @Component({
    name: NAME,
    el,
    components: {
      BtnPrimary,
      LinkPrimary,
      Dropdown
    },
  })
  class AccountBase extends Vue {

    state = window.APPSTATE;

    dropdownOptions = [
      { label: this.state.language.order_history, labelRight: '', value: 'order_history' },
      { label: this.state.language.address_book, labelRight: '', value: 'addresses' },
      { label: this.state.language.subscriptions, labelRight: '', value: 'subscriptions' },
      { label: this.state.language.rewards, labelRight: '', value: 'rewards' }
    ];

    selectedAccountNav = 'order_history';

    accountNav() {
      switch (window.location.pathname) {
        case "/account":
        case "/es/account":
        case "/fr/account":
        case "/de/account":
          if (window.location.search.includes('?view=my_rewards')) {
            this.selectedAccountNav = 'rewards';  
          }else if (window.location.search.includes('?view=subscriptions')) {
            this.selectedAccountNav = 'subscriptions';           
          } else {
            this.selectedAccountNav = 'order_history';
          }
          break;
        case "/account/addresses":
        case "/es/account/addresses":
        case "/fr/account/addresses":
        case "/de/account/addresses":
          this.selectedAccountNav = 'addresses';
          break;
        default:
          this.selectedAccountNav = 'order_history';
          break;
      }
    }

    mobileAccountNavigation(value: string) {
      this.selectedAccountNav = value;
      switch (value) {
        case "order_history":
          document.location.href = '/account';
          break;
        case "addresses":
          document.location.href = '/account/addresses';
          break;
        case "rewards":
          document.location.href = '/account?view=my_rewards';
          break;
        case "subscriptions":
          document.location.href = '/account?view=subscriptions';
          break;
        default:
          document.location.href = '/account';
          break;
      }
    }

    get currentOptions () {
      if (!this.state.settings.enable_subscription_tab) {
        return this.dropdownOptions.filter(item => item.value !== 'subscriptions');
      }
      return this.dropdownOptions;
    }

    mounted() {
      this.accountNav();
    }

  }

  return new Vue(AccountBase);
}
