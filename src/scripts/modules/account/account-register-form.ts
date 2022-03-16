import { Component, Mixins } from 'vue-property-decorator';
import ValidateMixin from '../../lib/validate';


@Component({
  name: 'account-register-form',
})
export default class AccountRegisterForm extends Mixins(ValidateMixin) {

  registrationAttempt() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'registration-attempt',
        'registrationSource': document.referrer
    });    
  }

  get registrationFail() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'event': 'registration-fail',
      'failureReason': '',
      'registrationSource': document.referrer
    });
    return '';
  }

}
