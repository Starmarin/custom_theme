<template>
  <svg :class="[iconClass, fillClass]" :style="iconStyle" v-on="$listeners">
    <title v-html="iconName"></title>
    <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="iconName"></use>
  </svg>
</template>

<script>
  export default {
    name: 'Icon',
    props: {
      name: String,
      size: {
        type: String,
        default: '24px',
      },
      fillClass: String,
    },
    computed: {
      iconClass() {
        const tempIconClass = { icon: true };

        tempIconClass[`icon--${this.name}`] = true;

        return tempIconClass;
      },
      iconStyle() {
        return {
          height: this.size,
          width: this.size,
        };
      },
      iconName() {
        return `#${this.name}`;
      },
    },
  };
</script>

<style></style>
