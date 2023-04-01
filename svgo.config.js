// The purpose of this file is to keep `viewbox` attribute on <svg> elements, see: https://github.com/gregberge/svgr/issues/760#issuecomment-1373976267
// eslint-disable-next-line no-undef
module.exports = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
        },
      },
    },
  ],
};
