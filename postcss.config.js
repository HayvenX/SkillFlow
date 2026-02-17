export default {
  plugins: {
    autoprefixer: { grid: true },
    ['postcss-pxtorem']: {
      rootValue: 16,
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: true,
      minPixelValue: 0,
    },
  },
  syntax: 'postcss-scss',
  map: true,
};
