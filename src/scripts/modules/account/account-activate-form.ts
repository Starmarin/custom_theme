import { Component, Vue,  Mixins } from 'vue-property-decorator';
import ValidateMixin from '../../lib/validate';

@Component({
  name: 'account-activate-form',
})
export default class AccountActivateForm extends Mixins(ValidateMixin) {}
