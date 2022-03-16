import Vue from 'vue';
import Component from 'vue-class-component';
import difference from 'lodash/difference';
import appState from '../../lib/appState';

const REDEMPTION_OPTION_RE = /\[cart\]/i;

@Component
export default class CartRewardsLogic extends Vue {
  customerDetails = null;

  redemptionOptions = [];

  initialized = false;

  selectedOption: any = null;

  appliedOption: any = null;

  usedDiscountCodes = appState.customer_discount_codes_used;

  discountCode: string|null = null;

  mounted() {
    this.init();
  }

  _filterRedemptions (option: any) {
    return REDEMPTION_OPTION_RE.test(option.name);
  }

  onSwellInit (fn: () => any) {
    if(window.swellAPI && window.swellAPI.getCustomerDetails().referralCode) {
      fn();
      this.initialized = true;
    } else {
      setTimeout(this.onSwellInit.bind(this, fn), 1000);
    }
  }

  init () {
    this.onSwellInit(() => {
      this.customerDetails = window.swellAPI.getCustomerDetails();
      this.redemptionOptions = window.swellAPI.getActiveRedemptionOptions()
        .filter(this._filterRedemptions);
      
      const { option, code } = this.getUnusedPointRedemption(window.swellAPI.getCustomerDetails().pointRedemptions)
      this.appliedOption = option;
      this.selectedOption = option;
      this.discountCode = code;
    })
  }

  /** Figure out which discount codes from point redemptions have be used by comparing with codes used in customer.orders.
   *  If found, this should be preselected. */
  getUnusedPointRedemption (pointRedemptions: any[]) {
    const flatCodesConsumed = this.usedDiscountCodes.flatMap(k => k);
    const flatCodesFromPoints = pointRedemptions.map(redemption => redemption.reward_text);
    const unusedCodesFromPoints = difference(flatCodesFromPoints, flatCodesConsumed);

    if(unusedCodesFromPoints.length === 0) return {};

    // there could be more than 1 code unused but for our ui we can only show 1 as selected.
    // the customer can always change the code at checkout
    const unusedCodeRedemptionOptionName = pointRedemptions.find(redemption => redemption.reward_text === unusedCodesFromPoints[0]).redemption_option.name
    return {
      option: this.redemptionOptions.find((redemptionOpt: any) => redemptionOpt.name === unusedCodeRedemptionOptionName),
      code: unusedCodesFromPoints[0]
    }
  }

  selectOption (option: any) {
    this.selectedOption = option;
  }

  apply() {
    return new Promise((res, rej) => {
      this.onSwellInit(() => {
        if(!this.selectedOption) {
          rej(new Error('No option selected'));
        } else {
          window.swellAPI.makeRedemption({ redemptionOptionId: this.selectedOption.id }, (redemption: any) => {
            this.appliedOption = this.selectedOption;
            this.init(); // update your state
            this.discountCode = redemption.couponCode;
            res(redemption);
          }, (e: Error) => {
            console.error(e)
            rej(e);
          });
        }
      })
    })
  }
}