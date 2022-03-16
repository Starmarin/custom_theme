<template>
  <div class="accordion-group">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'AccordionGroup',
    data() {
      return {
        accordions: [],
      };
    },
    methods: {
      addAccordion(accordion) {
        this.accordions.push(accordion);
      },
      removeAccordion(accordion) {
        const index = this.accordions.findIndex((a) => a.id === accordion.id);
        this.accordions.splice(index, 1);
      },
      activate({ id }) {
        this.accordions.forEach((accordion) => {
          accordion.$set(accordion, 'active', Boolean(id === accordion.id));
        });
      },
    },
  };
</script>
