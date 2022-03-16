const tailwindConfig = require('../../../tailwind.config.js');

/** Generate MediaQueryList Objects for the given tailwind screens config  */
function generateMediaQueries(screens: Dict): Record<string, MediaQueryList> {
  return Object.keys(screens).reduce((acc: Record<string, MediaQueryList>, key) => {
    acc[key] = matchMedia(`(min-width: ${screens[key]})`);
    return acc;
  }, {});
}

module.exports = generateMediaQueries(tailwindConfig.theme.screens);
