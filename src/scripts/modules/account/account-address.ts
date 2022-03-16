/* eslint-disable */
import { Component, Mixins, Prop } from 'vue-property-decorator';
import animateScrollTo from 'animated-scroll-to';
import ValidateMixin from '../../lib/validate';
import { loadCountries } from './@country-service';


@Component({
  name: 'AccountAddress',
})

export default class AccountAddress extends Mixins(ValidateMixin) {
  activeAddress = {}
  showNewAddressForm = false
  countries = [];
  state = window.APPSTATE;

  @Prop() readonly id!: string;

  toggleNewAddressForm (show: any) {
    this.showNewAddressForm = show
    show && this.$nextTick(() => {
      const scrollToElement : any = this.$refs.newAddressForm;
      animateScrollTo(scrollToElement, { verticalOffset: -100 });
    })
  }

  populateAddressForm (data: any) {
    this.activeAddress = data;
    this.toggleNewAddressForm(true);
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

  showEmptyForm () {
    for (let key in this.activeAddress) {
      // @ts-expect-error: Ignore dynamic lookup
      this.activeAddress[key] = ''
    }
    this.toggleNewAddressForm(true)
  }

  created () {
    loadCountries('EN')
      .then(countries => {
        this.countries = countries
      })
  }
}
