import { Component, Mixins } from 'vue-property-decorator';
import ValidateMixin from '../../lib/validate';

@Component({
  name: 'account-reset-form',
})
export default class AccountResetForm extends Mixins(ValidateMixin) {}
