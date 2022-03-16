import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class ValidateMixin extends Vue {
  validate (e: any) {
    const isValid = this.$children
      .filter((c: any) => (typeof c.validate !== 'undefined'))
      .map((c: any) => c.validate())
      .every((res: any) => res)

    if (!isValid) {
      e.preventDefault()
    }
  }
}
