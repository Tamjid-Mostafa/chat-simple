const { useBabelRc, addWebpackModuleRule, override } = require('customize-cra');

module.exports = override(
  useBabelRc(),
  addWebpackModuleRule({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('ts-loader'),
  }),
);
