/* eslint-disable */
import { Component, Mixins, Prop } from 'vue-property-decorator';
import ValidateMixin from '../../lib/validate';

@Component({
  name: 'AccountAddressItem',
})

export default class AccountAddressItem extends Mixins(ValidateMixin) {
  @Prop() readonly firstName!: string

  @Prop() readonly lastName!: string

  @Prop() readonly company!: string

  @Prop() readonly address1!: string

  @Prop() readonly address2!: string

  @Prop() readonly city!: string

  @Prop() readonly province!: string

  @Prop() readonly zip!: string

  @Prop() readonly country!: string

  @Prop() readonly phone!: string

  @Prop() readonly isDefault!: string

  @Prop() readonly id!: string

  state = window.APPSTATE;

  update () {
    this.$emit('update', {...this.$options.propsData});
  }

  remove () {
    if (
      !confirm(this.state.language.confirm_delete)
    ) return

    const form = document.createElement('form');
    const input = document.createElement('input');

    form.setAttribute('method', 'post');
    form.setAttribute('action', '/account/addresses/' + this.id);

    input.setAttribute('type', 'hidden');
    input.setAttribute('name', '_method');
    input.setAttribute('value', 'delete');

    form.appendChild(input);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  }

}

