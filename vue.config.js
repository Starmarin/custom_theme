/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-param-reassign */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/** the default behavior of vue-cli is to use subdirectries named by file type
 *  .js  files get output into dist/js
 *  .css files get output into dest/css
 *  etc. etc.
 *
 *  We want to output all files directly into dist without subdirectories.
 *  If we don't do this, final asset paths will fail on the frontend
 *  because shopify doesn't expect subdirectories
 *  ex. <shopifycdn>/js/<myfile>.js will fail
 *
 * @param {WebpackChain} config
 */
function makeWebpackOutputFilesFlat(config) {
  config.output.filename('[name].js').chunkFilename('[name].js');

  config.module
    .rule('images')
    .use('url-loader')
    .tap((options) => {
      options.fallback.options.name = '[name].[ext]';
      return options;
    });

  config.module
    .rule('fonts')
    .use('url-loader')
    .tap((options) => {
      options.fallback.options.name = '[name].[ext]';
      return options;
    });

  config.module
    .rule('media')
    .use('url-loader')
    .tap((options) => {
      options.fallback.options.name = '[name].[ext]';
      return options;
    });

  config.module
    .rule('svg')
    .use('file-loader')
    .tap((options) => {
      options.name = '[name].[ext]';
      return options;
    });
}

module.exports = {
  chainWebpack: (config) => {
    // delete the default vue-cli entry-point since we need our
    // entrypoint in a different directory and have flexibility over naming
    config.entryPoints.delete('app');

    // set the public path to find assets through the shopify cdn
    config.output.publicPath('https://cdn.shopify.com/s/files/1/1009/9108/t/18/assets/');

    config.optimization.delete('splitChunks');

    makeWebpackOutputFilesFlat(config);

    config.plugin('html').init((Plugin, args) => {
      delete args[0].templateParameters;
      return new Plugin(...args);
    });
  },
  configureWebpack: {
    plugins: process.env.NODE_ENV === 'analyze' ? [new BundleAnalyzerPlugin()] : [],
  },
  // we are doing the same thing as {@link makeWebpackOutputFilesFlat} here
  css: {
    extract: {
      filename: '[name].css.liquid',
      chunkFilename: '[name].css.liquid',
    },
    loaderOptions: {
      sass: {
        // eslint-disable-next-line global-require
        implementation: require('sass'),
        webpackImporter: false,
        sassOptions: {
          includePaths: ['node_modules'],
        },
      },
    },
  },
  // no hashes so we can reference them by name in liquid
  filenameHashing: false,
  publicPath: 'https://cdn.shopify.com/s/files/1/1009/9108/t/18/assets/',
  runtimeCompiler: true,
};
