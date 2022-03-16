const postcss = require('postcss');

const liquidVariables = postcss.plugin('postcss-ignore', () => {
  const LIQUID_RE = /(?:'|")(\{\{.+\}\})(?:'|")/;
  const isLiquid = (value) => LIQUID_RE.test(value);

  return function (css) {
    css.walkDecls((rule) => {
      if (isLiquid(rule.value)) {
        const [__, liquid] = rule.value.match(LIQUID_RE);
        rule.replaceWith(postcss.decl({ prop: rule.prop, value: liquid }));
      }
    });
  };
});

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    liquidVariables(),
  ],
};
