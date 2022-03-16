import { Component, Mixins } from 'vue-property-decorator';
import ValidateMixin from '../../lib/validate';

@Component({
  name: 'AccountLoginForm',
})
export default class AccountLoginForm extends Mixins(ValidateMixin) {
  $parent!: any;

  get active () {
    return this.$parent.activeForm === 'login'
  }

  loginAttempt() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'login-attempt',
        'loginSource': document.referrer
    });    
  }

  get loginFail() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'login-fail',
      'failureReason': '',
      'loginSource': document.referrer
    });
    return '';
  }

  mounted() {
  }

}
