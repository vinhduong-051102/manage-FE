const { override, useBabelRc, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useBabelRc(),
  // addWebpackModuleRule({
  //   test: /\.svg$/,
  //   use: 'svg-inline-loader',
  // }),
);
