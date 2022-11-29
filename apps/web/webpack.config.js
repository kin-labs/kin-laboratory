const webpackConfig = require('@nrwl/react/plugins/webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (config) => {
  webpackConfig(config);

  config.plugins.push(
    new CopyPlugin({
      patterns: [
        {
          from: '../../node_modules/@trustwallet/wallet-core/dist/lib/wallet-core.wasm',
          to: '',
        },
      ],
    })
  );

  return {
    ...config,
    resolve: {
      ...config.resolve,
      fallback: {
        ...config.resolve.fallback,
        buffer: require.resolve('buffer/'),
        fs: false,
      },
    },
  };
};
