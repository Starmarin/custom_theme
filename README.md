
This is a hybrid of vue-cli 3 and the shopify gulp workflow. Vue-cli manages js, ts, vue, scss. Gulp handles uploading to Shopify.

Features:

- Typescript
- Supports multiple js entry points (`*.entry.(j|t)s` files)
- Jest
- Tailwind.css with purgeCSS
- Vue styleguidist documentation generation
- Liquid values in SCSS and JS

## Liquid in SCSS

- Only values are accepted `{{ settings.xyz }}`
- Liquid must be singlequoted `color: '{{ settings.my_color }}';`
- Liquid in Vue single file component `<style></style>` blocks will not work

## General project convention

- style using tailwind classes as much as possible
- document any components meant for reuse

## Linting

By default this project uses Prettier, ESLint, and StyleLint to enforce base coding standards. Our base standards are pulled, unedited, from the AirBnB ruleset as they have been fairly 'industry-standard' for a good amount of time.

[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
[Airbnb CSS/Sass Style Guide](https://github.com/airbnb/css)
[BVA Linting Configurations](https://github.com/BVAccel/linting-config)

Note: If you are using ESLint via a text editor plugin, you will likely need to add the configuration to run ESLint against .vue files as, by default, it will only run against .js files. Below are examples of how that can be done in VSCode and Sublime. Other linter configs can be found [here](https://eslint.vuejs.org/user-guide/#editor-integrations)

