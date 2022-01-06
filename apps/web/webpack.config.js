const webpackConfig = require('@nrwl/react/plugins/webpack');
module.exports = (config) => {
  webpackConfig(config);

  return {
    ...config,
    resolve: {
      ...config.resolve,
      fallback: {
        ...config.resolve.fallback,
        buffer: require.resolve('buffer/'),
      },
    },
  };
};
