import { Component, Mixins } from 'vue-property-decorator';
import ValidateMixin from '../../lib/validate';


@Component({
  name: 'AccountRecoverForm',
})
export default class AccountRecoverForm extends Mixins(ValidateMixin) {
  $parent!: any

  get active () {
    return this.$parent.activeForm === 'recover'
  }

  mounted() {
    if (this.$refs.success)  {
     this.$parent.changeForm('login');
    }
  }
}
