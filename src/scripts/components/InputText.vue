<template>
  <div class="input input--text" :class="stateClasses">
    <component
      :is="tag || 'input'"
      :type="type"
      :aria-labelledby="id"
      :disabled="disabled"
      :id="id"
      :value="value"
      ref="input"
      @input="handleInput"
      v-model="value"
      v-bind="$attrs"
      class="w-full"
    />
    <label v-if="label" :for="id">{{ label }}</label>
    <div class="input__error" v-if="!valid" role="alert">
      <slot name="error">{{ errorMessage }}</slot>
    </div>
    <div class="input__info">
      <slot name="info"></slot>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Watch } from 'vue-property-decorator';

export default Vue.extend({
  name: 'TextInput',
  data () {
    return {
      hasValue: 0,
      hasContent: ""
    }
  },
  props: {
    tag: {
      type: String,
      default: 'input',
    },
    value: String,
    label: String,
    valid: {
      type: Boolean,
      default: false,
    },
    errorMessage: String,
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: () => Math.random().toString(16).substring(2),
    },
  },
  computed: {
    stateClasses() {
      let { disabled, valid, value } = this;
      return {
        'input--dirty': (value && value.length > 0) || this.hasValue,
        'input--disabled': disabled,
        'input--valid': valid,
        'input--invalid': !valid,
      };
    },
  },
  methods: {
    validateFields(type, value){
      if(type === "phone"){
        let validFormat = /^\d{10}$/;
        if (value.match(validFormat)) {
          this.valid = true;
        }else {
          this.valid = false;
        }
      }else if(type === "email"){
        let validFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (value.match(validFormat)) {
          this.valid = true;
        }else {
          this.valid = false;
        }
      }else if (type === 'password' || type === 'text') {
        if(this.hasValue > 0 || (this.hasContent !== '' && this.hasContent !== 0)){
          this.valid = true;
        }else {
          this.valid = false;
        }
      } else if(type === '') {
        if(this.hasValue > 0 || (this.hasContent !== '' && this.hasContent !== 0)){
          this.valid = true;
        }else {
          this.valid = false;
        }
      }
    },
    handleInput ($event) {
      this.$emit('input', $event.target.value)
      this.hasValue = $event.target.value.length;
      this.hasContent = $event.target.value;
      this.validateFields(this.type, $event.target.value);
    }
  },
  mounted () {
    this.hasValue = this.$refs.input.length;
    this.hasContent = this.$refs.input.value.length;
    this.validateFields(this.type, this.value);
  }
});
</script>
