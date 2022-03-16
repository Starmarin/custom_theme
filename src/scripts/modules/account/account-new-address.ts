/* eslint-disable */
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
import ValidateMixin from '../../lib/validate';
import Dropdown from '../../components/Dropdown.vue';
@Component({
  name: 'AccountNewAddress',
  components: {
    Dropdown
  }
})

export default class AccountNewAddress extends Mixins(ValidateMixin) {
  @Prop() readonly firstName!: string;
  @Prop() readonly lastName!: string;
  @Prop() readonly company!: string;
  @Prop() readonly address1!: string;
  @Prop() readonly address2!: string;
  @Prop() readonly city!: string;
  @Prop({ default: null }) readonly province!: string;
  @Prop() readonly zip!: string;
  @Prop({ default: 'US' }) readonly country!: string;
  @Prop() readonly phone!: string;
  @Prop() readonly isDefault!: string;
  @Prop() readonly id!: string;
  @Prop() readonly toggleNewAddressForm!: string;
  @Prop() readonly countries!: Array<any>;

  state = window.APPSTATE;

  activeCountry = this.getCountryFromCode(this.country);
  activeProvince = this.province;

  get showProvinceSelect () {
    return (
      this.activeCountry &&
      this.activeCountry.zones.length
    )
  }

  get formAction () {
    if (this.id) {
      return `/account/addresses/${this.id}`
    } else {
      return '/account/addresses'
    }
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

  getInitialValue (name: any) {
    const match: any = name.match(/\[(.*)\]/)
    if (!match[1]) {
      return ''
    }
    const str = match[1]
    switch (str) {
      case 'first_name':
        return this['firstName'] || '';
      case 'last_name':
        return this['lastName'] || '';
      case 'default':
        return this['isDefault'] || false;
      default:
        // @ts-expect-error: Ignore dynamic lookup
        return this[str];
    }
  }

  getCountryFromCode (value: any) {
    return this.countries.find(country => country.code === value)
  }

  onInputChange ({name, value}: any) {
    const match = /\D\[(\D+)\]/.exec(name)
    if (!match || !match[1]) {
      return false
    }
    if (match[1] === 'province' && value) {
      this.activeProvince = value;
    }

    if (match[1] === 'country' && value) {
      this.activeCountry = this.getCountryFromCode(value);
      const country = this.countries[this.activeCountry]
    }
  }

  generateCountryArray () {
    return this.countries.map((country: any) => ({
      label: country.name,
      value: country.code
    }))
  }

  generateProvinceArray () {
    return this.activeCountry.zones.map((zone: any) => ({
      label: zone.name,
      value: zone.code
    }))
  }
}
