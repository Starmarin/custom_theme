/* eslint-disable */
import { Component, Mixins } from 'vue-property-decorator';
import ValidateMixin from '../../lib/validate';
import qs from 'query-string'

@Component({
  name: 'account-forms',
})

export default class AccountForms extends Mixins(ValidateMixin) {
  activeForm = 'login'

  convertUrlIDtoQueryString () {
    if (~location.href.indexOf('#recover')) {
      history.replaceState(null, '', `${location.pathname}?form=recover`)
    }
  }

  changeForm (form: any = false) {
    const parsed = qs.parse(location.search)
    if (!form && !parsed.form) {
      return
    }
    if (!form) {
      form = parsed.form
    } else {
      parsed.form = form
    }
    this.activeForm  = form
    history.replaceState(null, '', `${location.pathname}?${qs.stringify(parsed)}`)
  }

  mounted () {
    this.convertUrlIDtoQueryString()
    this.changeForm()

    if (document.getElementById('reset-pass-submit')) {
      this.activeForm = 'recover'
    }
  }
}
